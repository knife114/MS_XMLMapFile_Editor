
var buildToolBar = function () {
    var tb = new Ext.Toolbar();
    tb.add({ xtype: 'button', text: 'Save', handler: saveHtml });
    tb.add({ xtype: 'button', text: 'Cancel', handler: saveHtml });
    tb.add({ xtype: 'button', text: 'Validate', handler: saveHtml });
    tb.add("->");
    tb.add({ text: "Refresh", iconCls: "icon-arrowrefresh", handler: function () {
        //                Ext.getCmp(id).reload(true)
    } 
    });
};

var buildBottomBar = function () {
    var tb = new Ext.Toolbar();
    tb.add({ xtype: 'button', text: 'Save', handler: saveHtml });
    tb.add({ xtype: 'button', text: 'Add Height', iconCls: 'add', handler: function () {
        var height = Ext.getCmp("htmleditorID").getHeight();
        Ext.getCmp("htmleditorID").setHeight(height + 100);
    }
    });
    tb.add({ xtype: 'button', text: 'Delete Height', handler: function () {
        var height = Ext.getCmp("htmleditorID").getHeight();
        if (height > 200)
            height = height - 100;
        Ext.getCmp("htmleditorID").setHeight(height);
    }
    });
    tb.add({ xtype: 'button', text: 'Cancel', handler: saveHtml });
};