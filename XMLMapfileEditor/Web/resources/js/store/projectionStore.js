Ext.namespace('MSEditor');

MSEditor.ProjectionStore = function () {
    Ext.define('Projection', {
        extend: 'Ext.data.Model',
        idProperty: 'guid',
        fields: [
            { name: 'guid', mapping: 'guid' },
            { name: 'projection', mapping: 'projection', type: 'string' }
        ]
    });

    MSEditor.BaseStore.apply(this, arguments);

    this.model = Ext.ModelManager.getModel('Projection');
    //this.buildItems();

    this.getModel = function () {
        return this.model;
    };
    this.getPanelItems = function () {

        var imageFS = { xtype: 'textarea', title: 'projection'   };

        var items = [imageFS];

//        Ext.Object.each(this.customItems, function (key, value, myself) {
//            items[items.length] = value;
//        });
        return items;
    };
}
