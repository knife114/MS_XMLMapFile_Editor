Ext.namespace('MSEditor');

MSEditor.SymbolStore = function () {
    Ext.define('Symbol', {
        extend: 'Ext.data.Model',
        idProperty: 'guid', 
        fields: [
            { name: 'guid', mapping: 'guid', type: 'string' },
            { name: 'name', mapping: 'name', type: 'string' },
            { name: 'image', mapping: 'image', type: 'string' },
            { name: 'font', mapping: 'font', type: 'string' },
            { name: 'Points', mapping: 'Points', type: 'string' },
            { name: 'type', mapping: 'type', type: 'string' },
            { name: 'transparent', mapping: 'transparent', type: 'number' }
        ] 
    });

    MSEditor.BaseStore.apply(this, arguments);

    this.model = Ext.ModelManager.getModel('Symbol');
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
