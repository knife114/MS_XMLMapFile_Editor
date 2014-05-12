Ext.namespace('MSEditor');

MSEditor.ReferenceStore = function () {
    Ext.define('Reference', {
        extend: 'Ext.data.Model',
        idProperty: 'guid',
        fields: [
            { name: 'guid', mapping: 'guid' },
            { name: 'color', mapping: 'color', type2: 'color', convert: this.convertColor },
            { name: 'extent', mapping: 'extent', type: 'string' },
            { name: 'image', mapping: 'image', type: 'string' },
            { name: 'marker', mapping: 'marker', type: 'string' },
            { name: 'markerSize', mapping: 'markerSize', type: 'number' },
            { name: 'maxBoxSize', mapping: 'maxBoxSize', type: 'string' },
       
            { name: 'minBoxSize', mapping: 'minBoxSize', type: 'string' },
            { name: 'outlineColor', mapping: 'outlineColor', type2: 'color', convert: this.convertColor },
            { name: 'size', mapping: 'size', type: 'string' },
            { name: 'status', mapping: 'status', type: 'string', type2: 'status' } 
        ]
    });

    MSEditor.BaseStore.apply(this, arguments);

    this.model = Ext.ModelManager.getModel('Reference');
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
