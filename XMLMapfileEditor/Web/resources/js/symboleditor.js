/*

This file is part of Ext JS 4 

Contact:  http://www.mapviws.cn
*/

var urlActionObj, serverAction;
var editor = null;

var tpXml, editor, cbType;
Ext.onReady(function () {
    urlActionObj = new GPSMobileMonitor.Controler.URL.Action();
    serverAction = new MSEditor.ServerAction();
    cbType = Ext.create('Ext.form.field.ComboBox', {
        editable: false,
        store: ["SymbolXML", "SymbolFile"], fieldLabel: "SymbolType",
        anchor: '-2 -2'
    });
    var container1 = { xtype: 'container', columnWidth: .5, layout: 'column', items: [cbType] };

    tpXml = Ext.create('Ext.form.Panel', { bodyPadding: 5, title: 'XML Source', defaultType: 'textfield', items: [container1, getEditor()] });

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
               { xtype: 'button', text: 'Save', handler: saveContent },
               { xtype: 'button', text: 'Save As', handler: saveContent },
               { xtype: 'button', text: 'Export2Local', handler: serverAction.DownLoad },

               { xtype: 'button', text: 'Add Height', iconCls: 'add', handler: function () {
                   var height = Ext.getCmp("htmleditorID").getHeight();
                   Ext.getCmp("htmleditorID").setHeight(height + 100);
               }
               }, { xtype: 'button', text: 'Delete Height', handler: function () {
                   var height = Ext.getCmp("htmleditorID").getHeight();
                   if (height > 200)
                       height = height - 100;
                   Ext.getCmp("htmleditorID").setHeight(height);
               }
               },
               { xtype: 'button', text: 'Cancel', handler: saveContent }
            ],
            items: [tpXml]
        }]
    });

    serverAction.getContent(Ext.getUrlParam('guid'), Ext.getUrlParam('parentguid'),
                                                    Ext.getUrlParam('citype'), callback);
});
var callback = function (responseText, opts) {
    var obj = Ext.decode(responseText);
    Ext.getCmp("htmleditorID").setValue(obj.content);
    cbType.setValue(obj.citype);
    if (Ext.getCmp("htmleditorID").xtype == "textarea") {
        editor = CodeMirror.fromTextArea(document.getElementById(Ext.getCmp("htmleditorID").inputId), {
            mode: "application/xml",
            lineNumbers: true,
            lineWrapping: true,
            onCursorActivity: function () {
                editor.setLineClass(hlLine, null);
                hlLine = editor.setLineClass(editor.getCursor().line, "activeline");
            }
        });
        var hlLine = editor.setLineClass(0, "activeline");
    }
};

var saveContent = function () {
    var obj = {};
    obj.content = editor.getValue();
    obj.citype = cbType.getValue();

    serverAction.saveContent(Ext.getUrlParam('guid'), Ext.getUrlParam('parentguid'),
                Ext.getUrlParam('citype'), JSON.stringify(obj), urlActionObj.cmdSaveContent);
};

var getEditor = function () {
    return {
        xtype: 'textarea',
        id: 'htmleditorID',
        fieldLabel: 'Content',
        hideLabel: true,
        height: 250,
        anchor: '-2 -2'
    }
};