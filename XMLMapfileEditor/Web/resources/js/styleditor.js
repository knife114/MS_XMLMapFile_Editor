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

	Ext.onReady(function () {
	    urlActionObj = new GPSMobileMonitor.Controler.URL.Action();
	    storeSet = new MSEditor.StoreSet();
	    serverAction = new MSEditor.ServerAction();

	    var backgroundColor = { xtype: 'ux.colorpickerfield', fieldLabel: 'bgcolor', name: 'backgroundColor' };
	    var size = { xtype: 'numberfield', fieldLabel: 'size', name: 'size', allowBlank: false, maxValue: 100, minValue: 1, step: 1 };
	    var symbol = { fieldLabel: 'symbol', name: 'symbol' };
	    var opacity = { xtype: 'numberfield', fieldLabel: 'opacity', name: 'opacity', allowBlank: false, maxValue: 1, minValue: 0, step: 0.1 };
	    var offset = { fieldLabel: 'offset', name: 'offset' };
	    var searchfield = { fieldLabel: 'Search', xtype: 'customtrigger' };

	    var tabpanel1 = { title: 'Style Details', defaultType: 'textfield', items: [size, offset, symbol, opacity, backgroundColor] };
	    var tabpanel2 = { layout: 'fit', title: 'XML Source', defaultType: 'textfield', items: [getEditor()] };

	    simpleForm = Ext.create('Ext.form.Panel', {
	        border: false,
	        bodyBorder: false,
	        fieldDefaults: {
	            labelWidth: 100,
	            msgTarget: 'side'
	        },
	        defaults: {
	            anchor: '100%'
	        },
	        items: {
	            xtype: 'tabpanel',
	            activeTab: 0,
	            //tabPosition: 'bottom',
	            defaults: {
	                bodyStyle: 'padding:5px'
	            },
	            tabchange: {},
	            items: [tabpanel1, tabpanel2]
	        }
	    });

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

	    //创建User实例  
	    var model = Ext.ModelManager.getModel('Style');
	    var params = model.getProxy().extraParams;
	    params['cmd'] = urlActionObj.cmdGetStyle;
	    params['guid'] = Ext.getUrlParam('guid');
	    params['citype'] = Ext.getUrlParam('citype');

	    //读取id为1的User实例  
	    model.load(1, {
	        callback: function (records, operation) {

	            simpleForm.loadRecord(records);
	        }
	    });

	   

	});

	var saveContent = function () {
	    var guid = Ext.getUrlParam('guid');
	    var pguid = Ext.getUrlParam('parentguid');
	    var citype = Ext.getUrlParam('citype');
	    var content = Ext.getCmp("htmleditorID");
	    serverAction.saveContent(guid, pguid,citype,content );
	    //	    var g = simpleForm.getRecord();
	    //	    g.convertBack();
	    //	    g.save2();
	    //	    object.save({
	    //	        success: function (ed) {
	    //	            console.log("Saved Ed! His ID is " + ed.getId());
	    //	        }
	    //	    });
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

    };