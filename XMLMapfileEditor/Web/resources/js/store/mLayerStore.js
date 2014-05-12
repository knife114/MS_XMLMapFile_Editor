Ext.namespace('MSEditor');

MSEditor.MLayerStore = function () {
    Ext.define('MLayer', {
        extend: 'Ext.data.Model',
        idProperty: 'guid',
        fields: [
            { name: 'guid', mapping: 'guid' },
            { name: 'name', mapping: 'name', type: 'string' },
            { name: 'Value', mapping: 'Value', type: 'string' }
        ]
    });

    MSEditor.BaseStore.apply(this, arguments);
    var urlActionObj = new GPSMobileMonitor.Controler.URL.Action();
    this.model = Ext.ModelManager.getModel('MLayer');
    this.buildItems();

    this.getModel = function () {
        return this.model;
    };
    var me = this;
    this.getPanelItems = function () {
        // create the data store
        this.mdStore = Ext.create('Ext.data.Store', {
            fields: [
               { name: 'guid', mapping: 'guid' },
               { name: 'name', type: 'string' },
               { name: 'status', type: 'string' },
               { name: 'type', type: 'string' }
            ]
        });
        var mdStore2 = Ext.create('Ext.data.Store', {
            fields: [
               { name: 'guid', mapping: 'guid' },
               { name: 'name', type: 'string' },
               { name: 'status', type: 'string' },
               { name: 'type', type: 'string' }
            ]
        });
        // create the grid and specify what field you want
        // to use for the editor at each header. 
        var grid = Ext.create('Ext.grid.Panel', {
            defaults: { width: 190 },
            columns: [{
                header: 'guid',
                dataIndex: 'guid',
                hidden:true
            }, {
                header: 'name',
                dataIndex: 'name'

            }, {
                header: 'status',
                dataIndex: 'status'
            }, {
                header: 'type',
                dataIndex: 'type'
            }], multiSelect: true,
            selModel: { selType: 'checkboxmodel' },
            store: this.mdStore,
            tbar: [{
                text: '添加新图层',
                handler: function () {
                    var grid2 = Ext.create('Ext.grid.Panel', {
                        defaults: { width: 150 },
                        columns: [{
                            header: 'guid', dataIndex: 'guid', hidden: false
                        }, {
                            header: 'name', dataIndex: 'name'
                        }, {
                            header: 'status', dataIndex: 'status'
                        }, {
                            header: 'type', dataIndex: 'type'
                        }
                        ],
                        store: mdStore2,
                        multiSelect: true,
                        selModel: { selType: 'checkboxmodel' }
                    });
                    var winNewPrj = Ext.create('Ext.Window', {
                        title: '添加新图层',
                        width: 400,
                        height: 200,
                        plain: true,
                        layout: 'fit',
                        items: grid2,
                        buttons: [{
                            text: '取消',
                            handler: function () {
                                this.up('window').hide();
                            }
                        }, {
                            text: '添加',
                            handler: function () {
                                //
                                var selected = grid2.getSelectionModel().getSelection();
                                var Ids = [];
                                Ext.each(selected, function (item) {
                                    Ids.push(item.data); //id 对应映射字段                           
                                });
                                me.mdStore.loadData(Ids, true);
                                this.up('window').hide();
                            }
                        }]
                    });
                    winNewPrj.show();
                    serverAction.getJsonObject(Ext.getUrlParam('parentguid'), Ext.getUrlParam('parentguid'),
                                                    'LayerProj', function (response) {
                                                        var obj = Ext.decode(response);
                                                        mdStore2.loadData(obj);
                                                    });
                }
            }, {
                text: '删除图层',
                handler: function () {
                    var selected = grid.getSelectionModel().getSelection();
                    var Ids = [];
                    Ext.each(selected, function (item) {
                        me.mdStore.remove(item);
                    });

                }
            }],
            plugins: [this.cellEditing]
        }); 
        return grid;
    };

}
