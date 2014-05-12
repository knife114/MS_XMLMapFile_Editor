Ext.namespace('MSEditor');

MSEditor.StyleStore = function () {
    Ext.define('Style', {
        extend: 'Ext.data.Model',
        idProperty: 'guid',
        fields: [
           // { name: 'guid', mapping: 'guid' },
            {name: 'angle', mapping: 'angle' },
            { name: 'antialias', mapping: 'antialias' },
            { name: 'antialiasSpecified', mapping: 'antialiasSpecified' },
            { name: 'backgroundColor', mapping: 'backgroundColor', type2: 'color', convert: this.convertColor },
            { name: 'gap', mapping: 'gap', type: 'string' },
            { name: 'geomTransform', mapping: 'geomTransform' },
            { name: 'geomTransformSpecified', mapping: 'geomTransformSpecified', type: 'string' },

            { name: 'lineCap', mapping: 'lineCap' },
            { name: 'lineJoin', mapping: 'lineJoin', type: 'string' },
            { name: 'lineJoinMaxSize', mapping: 'lineJoinMaxSize', type: 'string' },
            { name: 'lineJoinSpecified', mapping: 'lineJoinSpecified' },
            { name: 'maxSize', mapping: 'maxSize', type: 'string' },
 
            {name: 'maxWidth', mapping: 'maxWidth' },
            { name: 'offset', mapping: 'offset', type: 'string' },
            { name: 'minWidth', mapping: 'minWidth', type: 'string' },
            { name: 'opacity', mapping: 'opacity' },
            { name: 'pattern', mapping: 'pattern', type: 'string' },

            { name: 'size', mapping: 'size', type: 'string' },
            { name: 'symbol', mapping: 'symbol', type: 'string' },
            { name: 'template', mapping: 'template', type: 'string' },
            { name: 'width', mapping: 'width', type: 'string' } 
        ]
    });

    MSEditor.BaseStore.apply(this, arguments);

    this.model = Ext.ModelManager.getModel('Style');
    this.buildItems();

    this.getModel = function () {
        return this.model;
    };
    this.getPanelItems = function () {
        // create the data store
        this.mdStore = Ext.create('Ext.data.Store', {
            fields: [
              { name: 'guid', mapping: 'guid' },
               { name: 'name', type: 'string' },
               { name: 'status', type: 'string' }
            ]
        });

        /*
        * Here is where we create the Form
        */
        var gridForm = Ext.create('Ext.form.Panel', {
            id: 'class-form',
            frame: true,
            title: 'Company data',
            bodyPadding: 5, 
            layout: 'column',    // Specifies that the items will now be arranged in columns

            fieldDefaults: {
                labelAlign: 'left',
                msgTarget: 'side'
            },

            items: [{
                columnWidth: 0.50,
                xtype: 'gridpanel',
                store: this.mdStore,  
                columns: [
                {
                    id: 'guid',
                    text: 'guid',
                    flex: 1,
                    dataIndex: 'guid'
                },
                {
                    text: 'name',
                    width: 75,
                    sortable: true,
                    dataIndex: 'name'
                },
                {
                    text: 'status',
                    width: 75,
                    sortable: true, 
                    dataIndex: 'status'
                } 
            ], 
                listeners: {
                    selectionchange: function (model, records) {
                        if (records[0]) {
                            this.up('form').getForm().loadRecord(records[0]);
                        }
                    }
                }
            }, {
                columnWidth: 0.5,
                margin: '0 0 0 10',
                xtype: 'fieldset',
                title: 'Company details',
                defaults: {
                    width: 240,
                    labelWidth: 90
                },
                defaultType: 'textfield',
                items: [{
                    fieldLabel: 'Name',
                    name: 'company'
                }, {
                    fieldLabel: 'Price',
                    name: 'price'
                }, {
                    fieldLabel: '% Change',
                    name: 'pctChange'
                }, {
                    xtype: 'datefield',
                    fieldLabel: 'Last Updated',
                    name: 'lastChange'
                }, {
                    xtype: 'radiogroup',
                    fieldLabel: 'Rating',
                    columns: 3,
                    defaults: {
                        name: 'rating' //Each radio has the same name so the browser will make sure only one is checked at once
                    },
                    items: [{
                        inputValue: '0',
                        boxLabel: 'A'
                    }, {
                        inputValue: '1',
                        boxLabel: 'B'
                    }, {
                        inputValue: '2',
                        boxLabel: 'C'
                    }]
                }]
            }] 
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
        var items = [gridForm];
      
//         var items = [];

//        Ext.Object.each(this.customItems, function (key, value, myself) {
//            items[items.length] = value;
//        });
        return items;
    };
}
