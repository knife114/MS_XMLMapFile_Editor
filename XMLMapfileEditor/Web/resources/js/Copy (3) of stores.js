Ext.namespace('MSEditor');

MSEditor.StoreSet = function () {
    var urlActionObj = new GPSMobileMonitor.Controler.URL.Action();

    var convertColor = function (v, record) {
        var color = null;
        if (null == v.blue) {
            color = '#20E0D6';
        }
        else {
            color = new Ext.draw.Color(v.red, v.green, v.blue);
        }
        return color.toString();
    };
    var convertStyleBack = function () {
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

    var convertOffset = function (v, record) {
        var result = null;
        if (null == v.x) {
            result = "(0,0)";
        }
        else {
            result = "" + v.x + "," + v.y + "";
        }
        return result;
    };
    var convertSymbol = function (v, record) {
        var result = null;
        if (null == v.value) {
            result = "type=,value=";
        }
        else {
            result = "type=" + v.type + ",value=" + v.value;
        }
        return result;
    };

    Ext.define('Symbol', {
        extend: 'Ext.data.Model',
        idProperty: 'guid',
        convertBack: convertStyleBack,
        fields: [
            { name: 'guid', mapping: 'guid', type: 'string' },
            { name: 'name', mapping: 'name', type: 'string' },
            { name: 'image', mapping: 'image', type: 'string' },
            { name: 'font', mapping: 'font', type: 'string' },
            { name: 'Points', mapping: 'Points', type: 'string' },
            { name: 'type', mapping: 'type', type: 'string' },
            { name: 'transparent', mapping: 'transparent', type: 'number' }
        ],
        proxy: {
            type: 'ajax',
            url: urlActionObj.engine,
            extraParams: {
                guid: ''
            }
        }
    });

    Ext.define('Style', {
        extend: 'Ext.data.Model',
        idProperty: 'guid',
        convertBack: convertStyleBack,
        fields: [
            { name: 'guid', mapping: 'guid', type: 'string' },
            { name: 'style_id', mapping: 'style_id', type: 'string' },
            { name: 'backgroundColor', mapping: 'backgroundColor', type: 'string', convert: convertColor },
            { name: 'size', mapping: 'size', type: 'number' },
            { name: 'symbol', mapping: 'symbol', type: 'string', convert: convertSymbol },
            { name: 'opacity', mapping: 'opacity', type: 'number' },
            { name: 'offset', mapping: 'offset', type: 'string', convert: convertOffset }
        ],
        proxy: {
            type: 'ajax',
            url: urlActionObj.engine,
            extraParams: {
                guid: ''
            }
        }
    });

    Ext.define('Class', {
        extend: 'Ext.data.Model',
        idProperty: 'guid',
        fields: [
            { name: 'guid', mapping: 'guid', type: 'string' },
            { name: 'symbol_id', mapping: 'style_id', type: 'string' },
            { name: 'backgroundColor', mapping: 'backgroundColor', type: 'string', convert: convertColor },
            { name: 'size', mapping: 'size', type: 'number' },
            { name: 'symbol', mapping: 'symbol', type: 'string' },
            { name: 'opacity', mapping: 'opacity', type: 'number' },
            { name: 'offset', mapping: 'offset', type: 'string' }
        ],
        hasMany: { model: 'Style', name: 'styles' },
        proxy: {
            type: 'ajax',
            url: urlActionObj.engine,
            extraParams: {
                guid: ''
            }
        }
    });
    Ext.define('MapLayers', {
        extend: 'Ext.data.Model',
        idProperty: 'guid',
        fields: [
            { name: 'guid', mapping: 'guid', type: 'string' },
            { name: 'symbol_id', mapping: 'style_id', type: 'string' },
            { name: 'backgroundColor', mapping: 'backgroundColor', type: 'string', convert: convertColor },
            { name: 'size', mapping: 'size', type: 'number' },
            { name: 'symbol', mapping: 'symbol', type: 'string' },
            { name: 'opacity', mapping: 'opacity', type: 'number' },
            { name: 'offset', mapping: 'offset', type: 'string' }
        ],
        hasMany: { model: 'Style', name: 'styles' },
        proxy: {
            type: 'ajax',
            url: urlActionObj.engine,
            extraParams: {
                guid: ''
            }
        }
    });
    Ext.define('Web', {
        extend: 'Ext.data.Model',
        idProperty: 'guid',
        fields: [
            { name: 'guid', mapping: 'guid', type: 'string' },
            { name: 'Metadata', mapping: 'Metadata', type: 'object' },
            { name: 'imagePath', mapping: 'imagePath', type: 'string', convert: convertColor },
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

    this.addProxy = function (model) {
        
    };
    var storeStyle = Ext.create('Ext.data.Store', {
        model: 'Style',
        listeners: {
            beforeload: function () {
                var params = storeStyle.getProxy().extraParams;
                if (params.query) {
                    //delete params.forumId;
                } else {
                    //params.forumId = forumId;
                }
            }
        }
    });

    this.storeStyle = storeStyle;
    //    this.save = function(model){
    //        model
    //    };
}
