/*

This file is part of Ext JS 4 

Contact:  http://www.mapviws.cn
*/

var urlActionObj, storeSet, object, simpleForm, serverAction;
var editor = null;
Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true
});

Ext.Loader.setPath({
    'Ext': '/Web/JS/Ext.ux.ColorPicker/src'
});

Ext.require(['*']);
Ext.require(['Ext.ux.colorpicker.ColorPicker', 'Ext.ux.colorpicker.ColorPickerField']);
 
// 
Ext.applyIfChanged = function(object, config){
		var property;
		if (object) {
			for (property in config) {
				if (object[property] === undefined) {
					object[property] = config[property];
				} else {
					if(object[property] !== config[property]) {
						object[property] = config[property]
					}
				}
			}
		}
		return object;
	};

var webStore, projectionStore, mdStore,   cgStore;
var tpDS, tpDescription,   tpMd, tpClasses, tpXml;
Ext.onReady(function () {
    urlActionObj = new GPSMobileMonitor.Controler.URL.Action();
    storeSet = new MSEditor.StoreSet();
    projectionStore = new MSEditor.ProjectionStore();
    mdStore = new MSEditor.MetadataStore();
    dsStore = new MSEditor.DataStoreStore();
   
    lyrDes = new MSEditor.LyrDescriptionStore();
    cgStore = new MSEditor.ClassGeneralStore();
    serverAction = new MSEditor.ServerAction();

    tpDS = Ext.create('Ext.form.Panel', { layout: 'fit', title: 'Data Source ', defaultType: 'textfield', items: [dsStore.getPanelItems()] });
    tpDescription = Ext.create('Ext.form.Panel', { layout: 'fit', title: 'Description', defaultType: 'textfield', items: [lyrDes.getPanelItems()] });
    tpMd = Ext.create('Ext.form.Panel', { layout: 'fit', title: 'MetaData', defaultType: 'textfield', items: [mdStore.getPanelItems()] });
    tpClasses = Ext.create('Ext.form.Panel', { layout: 'fit', title: 'Class', defaultType: 'textfield', items: [cgStore.getPanelItems()] });
    tpXml = Ext.create('Ext.form.Panel', {tid:'xmlSource', bodyPadding: 5, title: 'XML Source', defaultType: 'textfield', items: [getEditor()] });

    var simpleForm = Ext.create('Ext.tab.Panel', {
       // xtype: 'tabpanel',
        activeTab: 0,
        //tabPosition: 'bottom',
        defaults: {
            bodyStyle: 'padding:5px'
        },
       // tabchange: tabchange,
        items: [tpDS, tpDescription,  tpMd, tpClasses, tpXml]
    });
    simpleForm.addListener('tabchange', tabchange);

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
            items: [simpleForm]
        }]
    });

    serverAction.getJsonObject(Ext.getUrlParam('guid'), Ext.getUrlParam('parentguid'),
                                                    Ext.getUrlParam('citype'), callback); 
});
	var callback = function (response, opts) {
	    var obj = Ext.decode(response); 
	    var mDS = dsStore.model.proxy.reader.read(obj);
	    if (typeof (mDS) !== 'undefined' && mDS.count > 0) {
	        tpDS.loadRecord(mDS.records[0]); 
	    }

	    var mDes= lyrDes.model.proxy.reader.read(obj);
	    if (typeof (mDes) !== 'undefined' && mDes.count > 0) {
	        tpDescription.loadRecord(mDes.records[0]);
	    }
         
	    var mClz = cgStore.model.proxy.reader.read(obj.Class);
	    if (typeof (mClz) !== 'undefined' && mClz.count > 0) {
	        tpClasses.loadRecord(mClz.records);
	    }
	    var mMd = mdStore.model.proxy.reader.read(obj);
	    if (typeof (mMd) !== 'undefined' && mMd.count > 0) {
	        tpMd.loadRecord(mMd.records[0]);
	    } 
	};

	var saveContent = function () {

	    var obj = Ext.Object.merge(tpDescription.getValues(), tpDS.getValues());
	    obj.filter = null;
	    //layer save
	    obj.Class = [];
	    for (var i = 0; i < cgStore.mdStore.data.items.length; i++) {

	        //cgStore.mdStore.data.items[i].data.color = convertColorBack();
	        obj.Class.push(cgStore.mdStore.data.items[i].data);
	    }
	    serverAction.saveContent(Ext.getUrlParam('guid'), Ext.getUrlParam('parentguid'),
                Ext.getUrlParam('citype'), JSON.stringify(obj), urlActionObj.cmdSaveJsonObject);

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
    var tabchange = function (tabpanel, newCard, oldCard) {
        if (typeof (newCard.tid) !== 'undefined' && newCard.tid == 'xmlSource') {
            serverAction.getContent(Ext.getUrlParam('guid'), Ext.getUrlParam('parentguid'),
                                                    Ext.getUrlParam('citype'), callbackXML);
        } else if (typeof (oldCard.tid) !== 'undefined' && oldCard.tid == 'xmlSource') {
            Ext.MessageBox.alert("提示", "请先保存！");
        }
    };

    var callbackXML = function (responseText, opts) {
        var obj = Ext.decode(responseText);
        Ext.getCmp("htmleditorID").setValue(obj.content);
        
        if (editor == null) {
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
        else {
            editor.setValue(obj.content);
        }
    };