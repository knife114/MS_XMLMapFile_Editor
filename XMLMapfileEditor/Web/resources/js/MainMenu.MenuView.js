

GPSMobileMonitor.MainMenu.MenuView = function (treePanel) {
    var winNewPrj = null;
    this.westTree = treePanel;
    this.westRootNode = this.westTree.getRootNode();
    var urlActionObj = new GPSMobileMonitor.Controler.URL.Action();

    this.addNewItem = function (cmdType, node) {
        if (winNewPrj == null) {
            var form = Ext.widget('form', {
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                border: false,
                bodyPadding: 10,

                fieldDefaults: {
                    labelWidth: 100,
                    labelStyle: 'font-weight:bold'
                },
                defaults: {
                    margins: '0 0 10 0'
                },

                items: [
                   {
                       xtype: 'textfield',
                       fieldLabel: '工程名',
                       id: 'newPrjID',
                       allowBlank: false,
                       value: 's3'
                   }],

                buttons: [{
                    text: '取消',
                    handler: function () {
                        this.up('form').getForm().reset();
                        this.up('window').hide();
                    }
                }, {
                    text: '新建',
                    handler: function () {
                        if (this.up('form').getForm().isValid()) {
                            doAction(cmdType, node);
                            this.up('window').hide();
                        }
                    }
                }]
            });

            winNewPrj = Ext.create('Ext.Window', {
                title: '添加新项目',
                width: 400,
                height: 200,
                plain: true,
                layout: 'fit',
                items: form
            });
        }
        winNewPrj.show();
    };

    this.loadProjects = function () {

    };
    function doAction(cmdType, node) {
        Ext.Ajax.request({
            url: urlActionObj.engine,
            method: 'POST',
            params: {
                cmd: cmdType, 
                name: Ext.getCmp('newPrjID').getValue(),
                guid: node.data.guid,
                parentguid: node.data.parentguid,
                citype: node.data.addtype
            },
            success: function (response, options) {
                var text = response.responseText;
                if (response.status == "200" && text !="") {
                    node.appendChild(Ext.decode(response.responseText)); 
                } else {
                    Ext.MessageBox.alert(response.statusText, response.responseText);
                    return;
                }

            },
            failure: function (response, options) {
                Ext.MessageBox.alert(response.statusText, response.responseText);
            }
        });
    };
}