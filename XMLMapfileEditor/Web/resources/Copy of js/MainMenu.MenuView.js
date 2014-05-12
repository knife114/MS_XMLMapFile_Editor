

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
                            doCreate(cmdType, node);
                            //                            this.up('form').getForm().reset();
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
    function doCreate(cmdType, node) {
        Ext.Ajax.request({
            url: urlActionObj.engine,
            method: 'POST',
            params: {
                cmd: cmdType, 
                prjName: Ext.getCmp('newPrjID').getValue(),
                httddName: Ext.getCmp('newPrjID').getValue() + ".conf",
                pkgName: Ext.getCmp('newPrjID').getValue() + ".pkg.html",
                appRootFolder: Ext.getCmp('newPrjID').getValue()
            },
            success: function (response, options) {
                var text = response.responseText;
                if (response.status != "200") {
                    Ext.MessageBox.alert(response.statusText, response.responseText);
                    return;
                } 
                node.appendChild(Ext.decode(response.responseText));  
            },
            failure: function (response, options) {
                Ext.MessageBox.alert(response.statusText, response.responseText);
            }
        });
    };
}