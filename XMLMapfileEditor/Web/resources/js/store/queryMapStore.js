Ext.namespace('MSEditor');

MSEditor.QueryMapStore = function () {
    Ext.define('QueryMap', {
        extend: 'Ext.data.Model',
        idProperty: 'guid',
        fields: [
            { name: 'guid', mapping: 'guid' }, 
            //map.QueryMap.style = QueryMapStyle.HILITE
            {name: 'color', mapping: 'color', type2: 'color', convert: this.convertColor },
            { name: 'size', mapping: 'size', type: 'string' },
            { name: 'status', mapping: 'status', type: 'string', type2: 'status' },
            { name: 'style', mapping: 'style', type: 'string' } 
        ]
    });

    MSEditor.BaseStore.apply(this, arguments);

    this.model = Ext.ModelManager.getModel('QueryMap');
    this.buildItems();

    this.getModel = function () {
        return this.model;
    };
    this.getPanelItems = function () {
        var items = [ ];
        Ext.Object.each(this.customItems, function (key, value, myself) {
            items[items.length] = value;
        });
        return items;
    };
}
