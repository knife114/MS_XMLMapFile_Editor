Ext.namespace('MSEditor');

MSEditor.LegendStore = function () {
    Ext.define('Legend', {
        extend: 'Ext.data.Model',
        idProperty: 'guid',
        fields: [
            { name: 'guid', mapping: 'guid' },
            { name: 'imageColor', mapping: 'imageColor', type2: 'color', convert: this.convertColor },
            { name: 'keySize', mapping: 'keySize', type: 'string' },
            { name: 'keySpacing', mapping: 'keySpacing', type: 'string' },
            { name: 'Label', mapping: 'Label', type: 'string' },
            { name: 'outlineColor', mapping: 'outlineColor', type2: 'color', convert: this.convertColor },
            { name: 'position', mapping: 'position', type: 'string' },
      
            {name: 'positionSpecified', mapping: 'positionSpecified', type: 'string' },
            { name: 'postLabelCache', mapping: 'postLabelCache', type: 'string' },
            { name: 'postLabelCacheSpecified', mapping: 'postLabelCacheSpecified', type: 'string' },
            { name: 'status', mapping: 'status', type: 'boolean', type2: 'status' },
            { name: 'template', mapping: 'template', type: 'string' } 
        ]
    });

    MSEditor.BaseStore.apply(this, arguments);

    this.model = Ext.ModelManager.getModel('Legend');
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
