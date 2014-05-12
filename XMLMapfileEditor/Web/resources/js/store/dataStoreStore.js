Ext.namespace('MSEditor');

MSEditor.DataStoreStore = function () {
    Ext.define('DataStore', {
        extend: 'Ext.data.Model',
        idProperty: 'guid',
        fields: [
            { name: 'guid', mapping: 'guid' },
            { name: 'dataSourceType', mapping: 'dataSourceType' },
            { name: 'layertype', mapping: 'layertype', type: 'string' },
            { name: 'connectionType', mapping: 'connectionType', type: 'string' },
            { name: 'connection', mapping: 'connection', type: 'string' },
            { name: 'data', mapping: 'data', type: 'number' },
            { name: 'maxBoxSize', mapping: 'maxBoxSize', type: 'string' },
 
            {name: 'filter', mapping: 'filter', type: 'string' }, 
            { name: 'maxFeatures', mapping: 'maxFeatures', type: 'string' },
            { name: 'projection', mapping: 'projection', type: 'string'  } 
        ]
    });

    MSEditor.BaseStore.apply(this, arguments);

    this.model = Ext.ModelManager.getModel('DataStore');
    this.buildItems();

    this.getModel = function () {
        return this.model;
    };
    this.getPanelItems = function () {
        var items = [];
        Ext.Object.each(this.customItems, function (key, value, myself) {
            items[items.length] = value;
        });
        return items;
    };
}
