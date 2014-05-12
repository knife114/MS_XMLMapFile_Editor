Ext.namespace('MSEditor');

MSEditor.ScaleBarStore = function () {
    Ext.define('ScaleBar', {
        extend: 'Ext.data.Model',
        idProperty: 'guid',
        fields: [
            { name: 'guid', mapping: 'guid' },
            { name: 'align', mapping: 'align', type: 'object' },
            { name: 'backgroundColor', mapping: 'backgroundColor', type2: 'color', convert: this.convertColor },
            { name: 'color', mapping: 'color', type: 'string', convert: this.convertColor },
            { name: 'imageColor', mapping: 'imageColor', type: 'string' },
            { name: 'intervals', mapping: 'intervals', type: 'number' },
            { name: 'Label', mapping: 'Label', type: 'string' },

            { name: 'outlineColor', mapping: 'outlineColor', type2: 'color', convert: this.convertColor },
            { name: 'position', mapping: 'position', type: 'string' },
            { name: 'postLabelCache', mapping: 'postLabelCache', type: 'string' },
            { name: 'size', mapping: 'size', type: 'string' },
            { name: 'status', mapping: 'status', type: 'string', type2: 'status' },
            { name: 'transparent', mapping: 'transparent', type: 'string' },
            { name: 'style', mapping: 'size', style: 'string' },
            { name: 'units', mapping: 'units', style: 'string', type2: 'units' } 
        ]
    });

    MSEditor.BaseStore.apply(this, arguments);

    this.model = Ext.ModelManager.getModel('ScaleBar');
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
