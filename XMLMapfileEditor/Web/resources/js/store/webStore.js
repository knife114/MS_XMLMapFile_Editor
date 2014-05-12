Ext.namespace('MSEditor');

MSEditor.WebStore = function () {
    Ext.define('Web', {
        extend: 'Ext.data.Model',
        idProperty: 'guid',
        fields: [
            { name: 'guid', mapping: 'guid' },
            { name: 'Metadata', mapping: 'Metadata', type: 'object' },
            { name: 'imagePath', mapping: 'imagePath', type: 'string' },
            { name: 'imageUrl', mapping: 'imageUrl', type: 'string' },
            { name: 'footer', mapping: 'footer', type: 'string' },
            { name: 'log', mapping: 'log', type: 'number' },
            { name: 'empty', mapping: 'empty', type: 'string' },

            { name: 'header', mapping: 'header', type: 'string' },
            { name: 'error', mapping: 'error', type: 'string' },
            { name: 'tempPath', mapping: 'tempPath', type: 'string' },
            { name: 'template', mapping: 'template', type: 'string' },
            { name: 'maxScaleDenom', mapping: 'maxScaleDenom', type: 'string' },
            { name: 'minScaleDenom', mapping: 'minScaleDenom', type: 'string' },
            { name: 'maxTemplate', mapping: 'maxTemplate', type: 'string' },
            { name: 'minTemplate', mapping: 'minTemplate', type: 'string' }
        ]
    });

    MSEditor.BaseStore.apply(this, arguments);

    this.model = Ext.ModelManager.getModel('Web');
    this.buildItems();

    this.getModel = function () {
        return this.model;
    };
    this.getPanelItems = function () {
        
        var container1 = { xtype: 'container', columnWidth: .5, layout: 'column', items: [this.customItems['minTemplate'], this.customItems['maxTemplate']] };
        var container2 = { xtype: 'container', columnWidth: .5, layout: 'column', items: [this.customItems['minScaleDenom'], this.customItems['maxScaleDenom']] };
        var templateFS = { xtype: 'fieldset', title: 'Template and ScaleDenom', items: [this.customItems['template'],container1,container2],collapsible: true  };
       
        var container3 = { xtype: 'container', columnWidth: .5, layout: 'column', items: [this.customItems['imageUrl'], this.customItems['empty']] };
        var container4 = { xtype: 'container', columnWidth: .5, layout: 'column', items: [this.customItems['header'], this.customItems['error']] };
        var container5 = { xtype: 'container', columnWidth: .5, layout: 'column', items: [this.customItems['footer'], this.customItems['log']] };
        var imageFS = { xtype: 'fieldset', title: 'Image and Urls', items: [this.customItems['imagePath'], container3, container4, container5],collapsible: true  };
        
         var items = [templateFS, imageFS];

//        Ext.Object.each(this.customItems, function (key, value, myself) {
//            items[items.length] = value;
//        });
        return items;
    };
}
