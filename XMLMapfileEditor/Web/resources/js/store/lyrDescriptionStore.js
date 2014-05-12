Ext.namespace('MSEditor');

MSEditor.LyrDescriptionStore = function () {
    Ext.define('LyrDescription', {
        extend: 'Ext.data.Model',
        idProperty: 'guid',
        fields: [
            { name: 'guid', mapping: 'guid' },
            { name: 'name', mapping: 'name' },
            { name: 'header', mapping: 'header', type: 'string' },
            { name: 'group', mapping: 'group', type: 'string' },
            { name: 'template', mapping: 'template', type: 'string' },
            { name: 'footer', mapping: 'footer', type: 'number' },
             
            { name: 'status', mapping: 'status', type: 'string', type2: 'status' },
            { name: 'opacity', mapping: 'opacity', type: 'string' },
            { name: 'transform', mapping: 'transform', type: 'string' },
            { name: 'minScaleDenom', mapping: 'minScaleDenom', type: 'number' },
            { name: 'minScaleDenomSpecified', mapping: 'minScaleDenomSpecified', type2: 'ckbox' },
            { name: 'maxScaleDenom', mapping: 'maxScaleDenom', type: 'number' },
            { name: 'maxScaleDenomSpecified', mapping: 'maxScaleDenomSpecified', type2: 'ckbox' },

            { name: 'labelCache', mapping: 'labelCache', type: 'string' },
            { name: 'labelItem', mapping: 'labelItem', type: 'string' },
            { name: 'labelMaxScaleDenom', mapping: 'labelMaxScaleDenom', type: 'number' },
            { name: 'labelMinScaleDenom', mapping: 'labelMinScaleDenom', type: 'number' },
            { name: 'labelMinScaleDenomSpecified', mapping: 'labelMinScaleDenomSpecified', type2: 'ckbox' },
            { name: 'labelMaxScaleDenomSpecified', mapping: 'labelMaxScaleDenomSpecified', type2: 'ckbox' },

            { name: 'labelRequires', mapping: 'labelRequires', type: 'string' },
            { name: 'extent', mapping: 'extent', type: 'string' }
        ]
    });

    MSEditor.BaseStore.apply(this, arguments);

    this.model = Ext.ModelManager.getModel('LyrDescription');
    this.buildItems();

    this.getModel = function () {
        return this.model;
    };
    this.getPanelItems = function () {

        var container1 = { xtype: 'container', columnWidth: .5, layout: 'column', items: [this.customItems['header'], this.customItems['footer']] };
        var container2 = { xtype: 'container', columnWidth: .5, layout: 'column', items: [this.customItems['group'], this.customItems['template']] };
        var templateOpt = { xtype: 'fieldset', title: 'Options', items: [container1, container2], collapsible: true };


        var container3 = { xtype: 'container', columnWidth: .5, layout: 'column', items: [this.customItems['labelItem'], this.customItems['labelCache']] };
        var container4 = { xtype: 'container', columnWidth: .5, layout: 'column', items: [this.customItems['labelMinScaleDenomSpecified'], this.customItems['labelMinScaleDenom']] };
        var container5 = { xtype: 'container', columnWidth: .5, layout: 'column', items: [this.customItems['labelMaxScaleDenomSpecified'], this.customItems['labelMaxScaleDenom']] };
        var templateLabels = { xtype: 'fieldset', title: 'Labels', items: [this.customItems['labelRequires'], container3, container4, container5], collapsible: true };

        var container6 = { xtype: 'container', columnWidth: .5, layout: 'column', items: [this.customItems['minScaleDenomSpecified'], this.customItems['minScaleDenom']] };
        var container7 = { xtype: 'container', columnWidth: .5, layout: 'column', items: [this.customItems['maxScaleDenomSpecified'], this.customItems['maxScaleDenom']] };
        var templateScaleDenom = { xtype: 'fieldset', title: 'ScaleDenom', items: [container6, container7], collapsible: true };


        var items = [];
        items.push(this.customItems['name']);
        items.push(this.customItems['status']);
        items.push(this.customItems['opacity']);
        items.push(this.customItems['extent']);
        items.push(this.customItems['transform']);
        items.push(templateScaleDenom);
        items.push(templateLabels);
        items.push(templateOpt);
      
        return items;
    };
}
