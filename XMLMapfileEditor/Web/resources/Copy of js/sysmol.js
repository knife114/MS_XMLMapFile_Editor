/*

This file is part of Ext JS 4 

Contact:  http://www.mapviws.cn
*/

var urlActionObj; 

Ext.require(['*']);
Ext.onReady(function () {
    urlActionObj = new GPSMobileMonitor.Controler.URL.Action();
    
    Ext.create('Ext.Viewport', {

        layout: {
            type: 'border',
            padding: '1 2 0 2'
        },
        items: [{
            id: 'content-panel',
            region: 'center', // this is what makes this panel into a region within the containing layout
            layout: 'anchor',
            margins: '0',
            activeItem: 0,
            border: false,
            bbar: [
               { xtype: 'button', text: '保存', handler: saveHtml },
               { xtype: 'button', text: '源文件', handler: saveHtml },
               { xtype: 'button', text: '样式预览', handler: saveHtml }, 
               { xtype: 'button', text: 'Add Height', iconCls: 'add', handler: function () {
                   var height = Ext.getCmp("htmleditorID").getHeight();
                   Ext.getCmp("htmleditorID").setHeight(height + 100);
               }
               }, { xtype: 'button', text: 'Delete Height', handler: function () {
                   var height = Ext.getCmp("htmleditorID").getHeight();
                   if (height > 200)
                       height = height - 100;
                   Ext.getCmp("htmleditorID").setHeight(height    );
               }
               } 
            ],
            items: [{
                xtype: 'form',
                closable: false,
                border: false,
                fieldDefaults: {
                    labelAlign: 'top',
                    msgTarget: 'side'
                },
                items: [getEditor()]
            }]
        }]
    });

    getHtml();
});

var getHtml = function () {
    Ext.Ajax.request({
        url: urlActionObj.engine,
        params: {
            cmd: Ext.getUrlParam('cmd').split(',')[0],
            prjName: Ext.getUrlParam('prName'),
            content: ''
        },
        success: function (response, options) {
            var text = response.responseText;
            Ext.getCmp("htmleditorID").setValue(text);
        },
        failure: function (response, options) {
            Ext.MessageBox.alert(response.statusText, response.responseText);
        }
    });
}

var saveHtml = function () {
    Ext.Ajax.request({
        url: urlActionObj.engine,
        method:'POST',
        params: {
            cmd: Ext.getUrlParam('cmd').split(',')[1],
            prjName: Ext.getUrlParam('prName'),
            content: Ext.getCmp("htmleditorID").getValue()
        },
        success: function (response, options) {
            var text = response.responseText; 
        },
        failure: function (response, options) {
            Ext.MessageBox.alert(response.statusText, response.responseText);
        }
    });
}

var getEditor = function () {
    if (Ext.getUrlParam('type') == "pkg") {
        return {
            xtype: 'htmleditor',
            id: 'htmleditorID',
            fieldLabel: 'Content',
            height: 300, 
            anchor: '100%'
        };
    } else {
        return {
            xtype: 'textarea',
            id: 'htmleditorID',
            fieldLabel: 'Content',
            height: 300, 
            anchor: '100%'
        }
    }
}