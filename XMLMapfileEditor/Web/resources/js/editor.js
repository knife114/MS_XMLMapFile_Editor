/*

This file is part of Ext JS 4 

Contact:  http://www.mapviws.cn
*/

var urlActionObj; 
 var editor = null;
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
               { xtype: 'button', text: 'Save', handler: saveHtml },
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
               },
               { xtype: 'button', text: 'Cancel', handler: saveHtml }
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
            cmd: urlActionObj.cmdGetContent,
            guid: Ext.getUrlParam('guid'),
            parentguid: Ext.getUrlParam('parentguid'),
            citype: Ext.getUrlParam('citype')
        },
        success: function (response, options) {
            var text = response.responseText;
            Ext.getCmp("htmleditorID").setValue(text); 
            //return;
            if(Ext.getCmp("htmleditorID").xtype=="textarea")
            {
                 editor = CodeMirror.fromTextArea(document.getElementById(Ext.getCmp("htmleditorID").inputId), {
                      mode: "application/xml",
                      lineNumbers: true,
                      lineWrapping: true ,
                      onCursorActivity: function() {
                        editor.setLineClass(hlLine, null);
                        hlLine = editor.setLineClass(editor.getCursor().line, "activeline");
                      }
                    });
                    var hlLine = editor.setLineClass(0, "activeline");
            }
        },
        failure: function (response, options) {
            Ext.MessageBox.alert(response.statusText, response.responseText);
        }
    });
}

var saveHtml = function () {
    var content = editor==null? Ext.getCmp("htmleditorID").getValue() : editor.getValue();
    
    Ext.Ajax.request({
        url: urlActionObj.engine,
        method:'POST',
        params: {
            cmd: urlActionObj.cmdSaveContent,
            guid: Ext.getUrlParam('guid'),
            parentguid: Ext.getUrlParam('parentguid'),
            citype: Ext.getUrlParam('citype'),
            content: content
        },
        success: function (response, options) {
            var text = response.responseText; 
            Ext.MessageBox.alert(response.statusText, response.responseText);
        },
        failure: function (response, options) {
            Ext.MessageBox.alert(response.statusText, response.responseText);
        }
    });
}

var getEditor = function () {
    if (Ext.getUrlParam('citype').toLowerCase() == "pkghtml") {
        return {
            xtype: 'htmleditor',
            id: 'htmleditorID',
            fieldLabel: 'Content',
            height: 250,
            //                    autoHeight:true,
            anchor: '-5 -5'
        };
    } else {
        return {
            xtype: 'textarea',
            id: 'htmleditorID',
            fieldLabel: 'Content',
            height: 250,
            anchor: '-5 -5'
        }
    }
}