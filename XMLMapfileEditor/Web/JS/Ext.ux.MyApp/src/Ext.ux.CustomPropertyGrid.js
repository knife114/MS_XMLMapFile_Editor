/*

This file is part of Ext JS 4 

Contact:  http://www.mapviws.cn
*/

 
Ext.require(['*']);
Ext.require(['Ext.ux.colorpicker.ColorPicker', 'Ext.ux.colorpicker.ColorPickerField']);

Ext.define('Ext.ux.CustomTrigger', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.customtrigger',
    triggerCls: 'x-form-search-trigger', 
   editable : false
});
 Ext.define('Ext.ux.ClearableCombo', {
     extend: 'Ext.form.field.ComboBox',
     alias: 'widget.xcombo',
     triggerTip: 'Click to clear selection.',
     spObj: '',
     spForm: '',
     spExtraParam: '',
     qtip: 'Clearable Combo Box',
     trigger1Class: 'x-form-select-trigger',
     trigger2Class: 'x-form-clear-trigger',
     onRender: function (ct, position) {
         Ext.ux.ClearableCombo.superclass.onRender.call(this, ct, position);
         var id = this.getId();
         this.triggerConfig = {
             tag: 'div', cls: 'x-form-twin-triggers', style: 'display:block;width:46px;', cn: [
            { tag: "img", style: Ext.isIE ? 'margin-left:-3;height:19px' : '', src: Ext.BLANK_IMAGE_URL, id: "trigger1" + id, name: "trigger1" + id, cls: "x-form-trigger " + this.trigger1Class },
            { tag: "img", style: Ext.isIE ? 'margin-left:-6;height:19px' : '', src: Ext.BLANK_IMAGE_URL, id: "trigger2" + id, name: "trigger2" + id, cls: "x-form-trigger " + this.trigger2Class }
        ]
         };
         this.triggerEl.replaceWith(this.triggerConfig);
         this.triggerEl.on('mouseup', function (e) {

             if (e.target.name == "trigger1" + id) {
                 this.onTriggerClick();
             } else if (e.target.name == "trigger2" + id) {
                 this.reset();
                 if (this.spObj !== '' && this.spExtraParam !== '') {
                     Ext.getCmp(this.spObj).store.setExtraParam(this.spExtraParam, '');
                     Ext.getCmp(this.spObj).store.load()
                 }
                 if (this.spForm !== '') {
                     Ext.getCmp(this.spForm).getForm().reset();
                 }
             }
         },
this);
         var trigger1 = Ext.get("trigger1" + id);
         var trigger2 = Ext.get("trigger2" + id);
         trigger1.addClsOnOver('x-form-trigger-over');
         trigger2.addClsOnOver('x-form-trigger-over');
     }
 });

 Ext.define('Ext.ux.CustomPropertyGrid', {
     extend: 'Ext.grid.property.Grid',
     alias: 'widget.custompropertygrid', //  


     initComponent: function () {

         for (var key in this.source) {
             var opt = this.source[key];
             if (typeof (this.customEditors) == 'undefined') { this.customEditors = {}; }
             if (!Ext.isDefined(opt)) {
                 this.customEditors[key] = this.getField(opt);
                 this.source[key] = [].toString();
             }
             else if (typeof (opt) == 'object' && Ext.isDate(opt)) {
                 continue;
             }
             else if (typeof (opt) == 'object' && Ext.isArray(opt)) {
                 this.customEditors[key] = this.getCombo(opt);
                 this.source[key] = opt.shift();
             }
             else if (typeof (opt) == 'object' && opt == null) {
                 this.customEditors[key] = this.getFieldtext(key, opt);
                 this.source[key] = "";
             }
             else if (typeof (opt) == 'object') {
                 this.customEditors[key] = this.getTrigger(key, opt);
                 this.source[key] = opt.toString();
             }
         }
         Ext.ux.CustomPropertyGrid.superclass.initComponent.apply(this, arguments);
     }, // 
     getCombo: function (itemArray) {
         var combo = Ext.create('Ext.form.ComboBox', {
             store: itemArray,
             triggerAction: 'all',
             editable: false,
             allowBlank: false
         });

         return Ext.create('Ext.grid.CellEditor', { field: combo });
     }, // 
     getTrigger: function (title, item) {
         var me = this;
         var trigger = Ext.create('Ext.ux.CustomTrigger', { uvalue: item, utitle: title, uxtype: me.xtype,
             editable: false,
             onTriggerClick: me.createWin
         });
         //        trigger.superclass.disabled = true;
         return Ext.create('Ext.grid.CellEditor', { field: trigger });
     }, // 
     getFieldtext: function (title, item) {
         var me = this;
         var trigger = Ext.create('Ext.form.field.Text', { uvalue: item, utitle: title, uxtype: me.xtype,
             editable: false,
             onTriggerClick: me.createWin
         });
         //        trigger.superclass.disabled = true;
         return Ext.create('Ext.grid.CellEditor', { field: trigger });
     },
     createWin: function () {
         var me = this;
         if (me.win != null) {
             me.win.show();
             return;
         }
        
         var grid = { xtype: me.uxtype, border: 0,
             editable: false,
             height: 300, source: me.uvalue
         };

         var win = Ext.create('Ext.window.Window', {
             title: me.utitle,
             closable: true,
             closeAction: 'hide',
             width: 400,
             minWidth: 350,
             height: 350,
             layout: 'fit',
             items: [grid]
         });
         win.show();
         me.win = win;
     }
 });
 
 