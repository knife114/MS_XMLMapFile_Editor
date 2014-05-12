Ext.namespace('MSEditor');

MSEditor.ClassGeneralStore = function () {
    Ext.define('ClassGeneral', {
        extend: 'Ext.data.Model',
        idProperty: 'guid',
        fields: [
        // { name: 'guid', mapping: 'guid' },
            {name: 'backgroundColor', mapping: 'backgroundColor', type2: 'color', convert: this.convertColor },
            { name: 'color', mapping: 'color', type2: 'color', convert: this.convertColor },
             { name: 'debug', mapping: 'debug' },
            { name: 'debugSpecified', mapping: 'debugSpecified', type2: 'ckbox' },
            { name: 'expression', mapping: 'expression', type: 'string' },
            { name: 'group', mapping: 'group' },
            { name: 'Item', mapping: 'Item', type: 'string' },

            { name: 'keyImage', mapping: 'keyImage' },
            { name: 'Label', mapping: 'Label', type: 'string' },
            { name: 'maxScaleDenom', mapping: 'maxScaleDenom', type: 'number' },
            { name: 'maxScaleDenomSpecified', mapping: 'maxScaleDenomSpecified', type2: 'ckbox' },
            { name: 'maxSize', mapping: 'maxSize', type: 'string' },

             { name: 'minScaleDenom', mapping: 'minScaleDenom', type: 'number' },
            { name: 'minScaleDenomSpecified', mapping: 'minScaleDenomSpecified', type2: 'ckbox' },
            { name: 'minSize', mapping: 'minSize', type: 'string' },
            { name: 'name', mapping: 'name' },
            { name: 'size', mapping: 'size', type: 'string' },

            { name: 'Style', mapping: 'Style', type: 'string' },
            { name: 'symbol', mapping: 'symbol', type: 'string' },
            { name: 'template', mapping: 'template', type: 'string' },
            { name: 'text', mapping: 'text', type: 'string' },
            { name: 'status', mapping: 'status', type2: 'status' }
        ]
    });
    var me = this;
    MSEditor.BaseStore.apply(this, arguments);

    this.model = Ext.ModelManager.getModel('ClassGeneral');
    this.buildItems();

    this.getModel = function () {
        return this.model;
    };
    this.getPanelItems = function () {
        // create the data store
        this.mdStore = Ext.create('Ext.data.Store', {
            model: 'ClassGeneral'
        });

        /*
        * Here is where we create the Form
        */
        var gridForm = Ext.create('Ext.form.Panel', {
            id: 'class-form',
            frame: true,
            bodyPadding: 0,
            layout: 'column',    // Specifies that the items will now be arranged in columns

            fieldDefaults: {
                labelAlign: 'left',
                msgTarget: 'side'
            },

            items: [{
                columnWidth: 0.50,
                xtype: 'gridpanel',
                id: 'class-grid',
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
                title: 'Class details',
                defaults: {
                    width: 240,
                    labelWidth: 90
                },
                defaultType: 'textfield',
                items: [this.customItems['name'], this.customItems['status'], this.customItems['symbol'],
                            this.customItems['Style'], this.customItems['size'],
                            this.customItems['expression'], this.customItems['color'],
                            this.customItems['backgroundColor'], this.customItems['Label']]
            }],
            tbar: ["->", {
                text: 'Save',
                handler: this.saveRecord
            }, {
                text: 'SaveAs',
                handler: this.saveAsRecord
            }, {
                text: 'Delete',
                handler: this.deleteRecord
            }]
        });

        var items = [gridForm];

        return items;
    };
    this.deleteRecord = function () {
        Ext.getCmp("class-grid").store.remove(Ext.getCmp("class-grid").getSelectionModel().selected.items);
    };

    this.saveRecord = function () {
        var items = Ext.getCmp("class-grid").getSelectionModel().selected.items;
        var rObj = Ext.getCmp("class-form").getValues();
        me.customItems['backgroundColor'].getJsonValue();
        if (items.length > 0) {
            var r = items[0];
            r.set(rObj);
        }
        else {
            me.saveAsRecord();
        }
    };
    this.saveAsRecord = function () {
        var rObj = Ext.getCmp("class-form").getValues();
        var r = Ext.create('ClassGeneral', {});
        r.set(rObj);
        Ext.getCmp("class-grid").store.insert(0, r);
    };
}  