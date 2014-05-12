Ext.namespace('MSEditor');

MSEditor.LyrDisplayStore = function () {
    Ext.define('LyrDisplay', {
        extend: 'Ext.data.Model',
        idProperty: 'guid',
        fields: [
            { name: 'guid', mapping: 'guid' },
            { name: 'status', mapping: 'status', type: 'string', type2: 'status' },
            { name: 'opacity', mapping: 'opacity', type: 'string' },
            { name: 'transform', mapping: 'transform', type: 'string' },
            { name: 'minScaleDenom', mapping: 'minScaleDenom', type: 'number' },
            { name: 'maxScaleDenom', mapping: 'maxScaleDenom', type: 'number' },
            { name: 'maxScaleDenomSpecified', mapping: 'maxScaleDenomSpecified', type: 'bool' },

            { name: 'labelCache', mapping: 'labelCache', type: 'string' },
            { name: 'labelItem', mapping: 'labelItem', type: 'string' },
            { name: 'labelMaxScaleDenom', mapping: 'labelMaxScaleDenom', type: 'number' },
            { name: 'labelMinScaleDenom', mapping: 'labelMinScaleDenom', type: 'number' },
            { name: 'labelRequires', mapping: 'labelRequires', type: 'string' },
            { name: 'extent', mapping: 'extent', type: 'string' }

        ]
    });

    MSEditor.BaseStore.apply(this, arguments);

    this.model = Ext.ModelManager.getModel('LyrDisplay');
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
