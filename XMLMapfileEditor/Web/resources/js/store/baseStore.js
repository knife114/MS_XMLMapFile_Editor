Ext.namespace('MSEditor');

Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true
});

Ext.Loader.setPath({
    'Ext': '/Web/JS/Ext.ux.ColorPicker/src'
});

Ext.require(['*']);
Ext.require(['Ext.ux.colorpicker.ColorPicker', 'Ext.ux.colorpicker.ColorPickerField']);

// 
Ext.applyIfChanged = function (object, config) {
    var property;
    if (object) {
        for (property in config) {
            if (object[property] === undefined) {
                object[property] = config[property];
            } else {
                if (object[property] !== config[property]) {
                    object[property] = config[property]
                }
            }
        }
    }
    return object;
};

MSEditor.BaseStore = function () {
    this.urlActionObj = new GPSMobileMonitor.Controler.URL.Action();

    this.getEditorNumber = function (fieldLabel) {
        return Ext.create('Ext.form.field.Number', { selectOnFocus: true, labelWidth: 150, fieldLabel: fieldLabel, name: fieldLabel });
    };
    this.getEditorDate = function (fieldLabel) {
        return Ext.create('Ext.form.field.Date', { selectOnFocus: true, labelWidth: 150, fieldLabel: fieldLabel, name: fieldLabel });
    };
    this.getEditorBoolean = function (fieldLabel) {
        return Ext.create('Ext.form.field.ComboBox', {
            editable: false, labelWidth: 150,
            store: [true, false], fieldLabel: fieldLabel, name: fieldLabel
        });
    };
    this.getEditorStatus = function (fieldLabel) {
        return Ext.create('Ext.form.field.ComboBox', {
            editable: false, labelWidth: 150,
            store: ['ON', 'OFF'], fieldLabel: fieldLabel, name: fieldLabel
        });
    };
    this.getEditorUnits = function (fieldLabel) {
        return Ext.create('Ext.form.field.ComboBox', {
            editable: false, labelWidth: 150,
            store: ['feet', 'inches', 'kilometers', 'meters', 'miles', 'dd'], fieldLabel: fieldLabel, name: fieldLabel
        });
    };
    this.getEditorSymbolType = function (fieldLabel) {
        return Ext.create('Ext.form.field.ComboBox', {
            editable: false, labelWidth: 150,
            store: ['ELLIPSE', 'HATCH', 'PIXMAP', 'SIMPLE', 'TRUETYPE', 'VECTOR'], fieldLabel: fieldLabel, name: fieldLabel
        });
    };

    this.getEditorColorPicker = function (fieldLabel) {
        return Ext.create('Ext.ux.colorpicker.ColorPickerField',
            { fieldLabel: fieldLabel, name: this.convertColor(fieldLabel) });
    };
    this.getEditorText = function (fieldLabel) {
        return Ext.create('Ext.form.field.Text', { selectOnFocus: true,
            fieldLabel: fieldLabel, name: fieldLabel
        });
    };
    this.getEditorCheckBox = function (fieldLabel) {
        return Ext.create('Ext.form.field.Checkbox', { selectOnFocus: true, labelWidth: 200, value: true, fieldLabel: fieldLabel, name: fieldLabel });
    };
    this.convertColor = function (v, record) {
        var color = null;
        if (null == v.blue) {
            color = '#20E0D6';
        }
        else {
            color = new Ext.draw.Color(v.red, v.green, v.blue);
        }
        return color.toString();
    };
    this.convertStyleBack = function () {
        var json = [];
        json.backgroundColor = [];
        json.offset = [];
        json.symbol = [];
        if (null != this) {
            //color
            var color = new Ext.draw.Color.fromString(this.get('backgroundColor'));
            json['backgroundColor'].blue = color.getBlue();
            json['backgroundColor'].red = color.getRed();
            json['backgroundColor'].green = color.getGreen();
            this.set('backgroundColor', json.backgroundColor);

            var offset = new Ext.draw.Color.fromString(this.get('offset'));
            json['offset'].x = offset.split(',')[0];
            json['offset'].y = offset.split(',')[1];
            this.set('offset', json.offset);

            var symbol = new Ext.draw.Color.fromString(this.get('symbol'));
            json['symbol'].type = symbol;
            json['symbol'].value = symbol;
            this.set('symbol', json.offset);
        }

        return this;
    };
    this.convertColorBack = function (colorHex) {
        var json = {};
        //color
        var color = new Ext.draw.Color.fromString(colorHex);
        json.blue = color.getBlue();
        json.red = color.getRed();
        json.green = color.getGreen();
        return json;
    };
    this.convertOffset = function (v, record) {
        var result = null;
        if (null == v.x) {
            result = "(0,0)";
        }
        else {
            result = "" + v.x + "," + v.y + "";
        }
        return result;
    };
    this.convertSymbol = function (v, record) {
        var result = null;
        if (null == v.value) {
            result = "type=,value=";
        }
        else {
            result = "type=" + v.type + ",value=" + v.value;
        }
        return result;
    };

    this.addProxy = function (extraParams) {
        this.model.setProxy({
            type: 'ajax',
            url: urlActionObj.engine,
            extraParams: extraParams
        })
    };
    this.buildItems = function () {
        var fields = this.model.prototype.fields;
        for (var key in fields.keys) {
            var name = fields.items[key].name;
            var type2 = fields.items[key].type2;
            var type = fields.items[key].type.type;

            if (typeof (this.customItems) == 'undefined') { this.customItems = {}; }

            if (typeof (type2) != 'undefined' && type2 == 'status') {
                this.customItems[name] = this.getEditorStatus(name);
            }
            else if (typeof (type2) != 'undefined' && type2 == 'units') {
                this.customItems[name] = this.getEditorUnits(name);
            }
            else if (typeof (type2) != 'undefined' && type2 == 'color') {
                this.customItems[name] = this.getEditorColorPicker(name);
            } else if (typeof (type2) != 'undefined' && type2 == 'ckbox') {
                this.customItems[name] = this.getEditorCheckBox(name);
            }
            else if (type == 'auto' || type == 'string' || typeof (type) == 'undefined' || type == null) {
                this.customItems[name] = this.getEditorText(name);
            } else if (type == 'number') {
                this.customItems[name] = this.getEditorNumber(name);
            } else if (type == 'date') {
                this.customItems[name] = this.getEditorDate(name);
            } else if (type == 'bool') {
                this.customItems[name] = this.getEditorBoolean(name);
            } else {
                this.customItems[name] = this.getEditorText(name);
            }
        }
    };

    //    this.storeStyle = Ext.create('Ext.data.Store', {
    //        model: 'Style',
    //        listeners: {
    //            beforeload: function () {
    //                var params = storeStyle.getProxy().extraParams;
    //                if (params.query) {
    //                    //delete params.forumId;
    //                } else {
    //                    //params.forumId = forumId;
    //                }
    //            }
    //        }
    //    });
    this.cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    });
}
