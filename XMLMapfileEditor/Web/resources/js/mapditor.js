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

var webStore, projectionStore, refStore, qms, sbStore, legendStore, mglStore, mdStore, mlyrStore;
var tpGe, tpXml, tpWeb, tpProjection, tpOutput, tpConfig, tpLayers, tpLegent, tpReference, tpScaleBar, tpQueryMap;
Ext.onReady(function () {
    urlActionObj = new GPSMobileMonitor.Controler.URL.Action();
    storeSet = new MSEditor.StoreSet();
    webStore = new MSEditor.WebStore();
    projectionStore = new MSEditor.ProjectionStore();
    refStore = new MSEditor.ReferenceStore();
    qms = new MSEditor.QueryMapStore();
    sbStore = new MSEditor.ScaleBarStore();
    legendStore = new MSEditor.LegendStore();
    mglStore = new MSEditor.MapGeneralStore();
    mdStore = new MSEditor.MetadataStore();
    serverAction = new MSEditor.ServerAction();
    mlyrStore = new MSEditor.MLayerStore();

    tpGe = Ext.create('Ext.form.Panel', { layout: 'fit', title: 'General ', defaultType: 'textfield', items: [mglStore.getPanelItems()] });
    tpXml = Ext.create('Ext.form.Panel', { layout: 'fit', title: 'XML Source', defaultType: 'textfield', items: [getEditor()] });
    tpWeb = Ext.create('Ext.form.Panel', { layout: 'fit', title: 'Web', defaultType: 'textfield', items: [webStore.getPanelItems(), mdStore.getPanelItems()] });
    tpProjection = Ext.create('Ext.form.Panel', { layout: 'fit', title: 'Projection', defaultType: 'textfield', items: [projectionStore.getPanelItems()] });
    tpOutput = Ext.create('Ext.form.Panel', { layout: 'fit', title: 'Output format', defaultType: 'textfield', items: [getEditor()] });
    tpConfig = Ext.create('Ext.form.Panel', { layout: 'fit', title: 'Config', defaultType: 'textfield', items: [getEditor()] });

    tpLayers = Ext.create('Ext.form.Panel', { layout: 'fit', title: 'Layers', defaultType: 'textfield', items: [mlyrStore.getPanelItems()] });
    tpLegent = Ext.create('Ext.form.Panel', { layout: 'fit', title: 'Legend', defaultType: 'textfield', items: [legendStore.getPanelItems()] });
    tpScaleBar = Ext.create('Ext.form.Panel', { layout: 'fit', title: 'ScaleBar', defaultType: 'textfield', items: [sbStore.getPanelItems()] });
    tpReference = Ext.create('Ext.form.Panel', { layout: 'fit', title: 'Reference', defaultType: 'textfield', items: [refStore.getPanelItems()] });
    tpQueryMap = Ext.create('Ext.form.Panel', { layout: 'fit', title: 'QueryMap', defaultType: 'textfield', items: [qms.getPanelItems()] });

    var simpleForm = {
        xtype: 'tabpanel',
        activeTab: 0,
        //tabPosition: 'bottom',
        defaults: {
            bodyStyle: 'padding:5px'
        },
        tabchange: {},
        items: [tpGe, tpWeb, tpProjection, tpLayers, tpLegent, tpScaleBar, tpReference,
                tpQueryMap, tpXml]
    };

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
    serverAction.getJsonObject(Ext.getUrlParam('guid'), Ext.getUrlParam('parentguid'),
                                                    'LayerInclude', callback2);
});
	var callback = function (response, opts) {
	    var obj = Ext.decode(response);
	    var mGe = mglStore.model.proxy.reader.read(obj);
	    var mWeb = webStore.model.proxy.reader.read(obj.Web);
	    //	    var mConf = webStore.model.proxy.reader.read(obj.Config);
	    var mLry = webStore.model.proxy.reader.read(obj.Layer);
	    var mRef = refStore.model.proxy.reader.read(obj.Reference);

	    if (typeof (mWeb) !== 'undefined' && mWeb.count > 0) {
	        tpWeb.loadRecord(mWeb.records[0]);
	        mdStore.mdStore.loadData(mWeb.records[0].data.Metadata);
//	        loadRecords
	    }
	    if (typeof(mGe)!=='undefined' && mGe.count > 0) tpGe.loadRecord(mGe.records[0]);
	    //	    if (mConf.count > 0) tpConfig.loadRecord(mConf.records[0]);
	    if (typeof (mLry) !== 'undefined' && mLry.count > 0) tpLayers.loadRecord(mLry.records[0]);
	    if (typeof (mRef) !== 'undefined' && mRef.count > 0) tpReference.loadRecord(mRef.records[0]);

	    var mLeg = legendStore.model.proxy.reader.read(obj.Legent);
	    if (typeof (mLeg) !== 'undefined' && mLeg.count > 0) tpLegent.loadRecord(mLeg.records[0]);

	    var mScal = sbStore.model.proxy.reader.read(obj.Legent);
	    if (typeof (mScal) !== 'undefined' && mScal.count > 0) tpScaleBar.loadRecord(mScal.records[0]);


	    var mProj = legendStore.model.proxy.reader.read(obj.Projection);
	    if (typeof (mProj) !== 'undefined' && mProj.count > 0) tpProjection.loadRecord(mProj.records[0]);

	    var mQM = legendStore.model.proxy.reader.read(obj.QueryMap);
	    if (typeof (mQM) !== 'undefined' && mQM.count > 0) tpQueryMap.loadRecord(mQM.records[0]);

	};
	var callback2 = function (response, opts) {
	    var obj = Ext.decode(response);  
	    mlyrStore.mdStore.loadData(obj); 
	};
	var saveContent = function () {
	    var obj = tpGe.getValues();
	    obj.Web = [];
	    obj.Web[0] = tpWeb.getValues();

	    obj.size = null;
	    obj.status = 0;
	    obj.imageColor = null;

	    //layer save
	    obj.include = [];
	    for (var i = 0; i < mlyrStore.mdStore.data.length; i++) {
	        obj.include[i] = "layer_" + mlyrStore.mdStore.data.items[i].data.guid;
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

    };