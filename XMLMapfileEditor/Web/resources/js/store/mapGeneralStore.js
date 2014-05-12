Ext.namespace('MSEditor');

MSEditor.MapGeneralStore = function () {
    Ext.define('MapGeneral', {
        extend: 'Ext.data.Model',
        idProperty: 'guid',
        fields: [
            { name: 'guid', mapping: 'guid' },
            { name: 'angle', mapping: 'angle', type: 'object' },
            { name: 'debug', mapping: 'debug', type: 'string', type2: 'status' },
            { name: 'extent', mapping: 'extent', type: 'string' },
            { name: 'fontSet', mapping: 'fontSet', type: 'string' },
            { name: 'imageColor', mapping: 'imageColor', type2: 'color', convert: this.convertColor },
            { name: 'imageType', mapping: 'imageType', type: 'string' },
        
            {name: 'maxSize', mapping: 'maxSize', type: 'string' },
            { name: 'name', mapping: 'name', type: 'string' },
            { name: 'resolution', mapping: 'resolution', type: 'string' },
            { name: 'scaleDenom', mapping: 'scaleDenom', type: 'string' },
            { name: 'size', mapping: 'size', type: 'string' },
            { name: 'status', mapping: 'status', type: 'bool', type2: 'status' },
            { name: 'units', mapping: 'units', type: 'string', type2: 'units' },
            { name: 'version', mapping: 'version', type: 'string' } 
        ]
    });

    MSEditor.BaseStore.apply(this, arguments);

    this.model = Ext.ModelManager.getModel('MapGeneral');
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
