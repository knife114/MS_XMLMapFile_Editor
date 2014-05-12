Ext.namespace('MSEditor');

MSEditor.MetadataStore = function () {
  
    Ext.define('Metadata', {
        extend: 'Ext.data.Model',
        idProperty: 'guid',
        fields: [
            { name: 'guid', mapping: 'guid' },
            { name: 'name', mapping: 'name', type: 'string' },
            { name: 'Value', mapping: 'Value', type: 'string' }
        ]
    });

    MSEditor.BaseStore.apply(this, arguments);

    this.model = Ext.ModelManager.getModel('Metadata');
    this.buildItems();

    this.getModel = function () {
        return this.model;
    };
    this.getPanelItems = function () {
        // create the data store
        this.mdStore = Ext.create('Ext.data.Store', {
            fields: [
               { name: 'name', type: 'string' },
               { name: 'Value', type: 'string' }
            ]
        });
        // create the grid and specify what field you want
        // to use for the editor at each header.
        var grid = Ext.create('Ext.grid.Panel', {
            columns: [{
                id: 'Metadata',
                header: 'Metadata Name',
                dataIndex: 'name',
                width: 190,
                editor: {
                    allowBlank: false
                }
            }, {
                header: 'Value',
                width: 200,
                dataIndex: 'Value',
                editor: {
                    allowBlank: false
                }
            }],
            selModel: {
                selType: 'cellmodel'
            },
            store: this.mdStore,
            tbar: [{
                text: 'Add Plant',
                handler: function () {
                    // Create a model instance
                    var r = Ext.create('Plant', {
                        common: 'New Plant 1',
                        light: 'Mostly Shady',
                        price: 0,
                        availDate: Ext.Date.clearTime(new Date()),
                        indoor: false
                    });
                    store.insert(0, r);
                    this.cellEditing.startEditByPosition({ row: 0, column: 0 });
                }
            }],
            plugins: [this.cellEditing]
        });
        var imageMD = { xtype: 'fieldset', title: 'Metadata', items: [grid], collapsible: true };
        var items = [imageMD];

        //        Ext.Object.each(this.customItems, function (key, value, myself) {
        //            items[items.length] = value;
        //        });
        return items;
    };
}
