 
function OnMapPageLoaded() { 
	var cw; 
    Ext.create('Ext.Viewport', {
        layout: {
            type: 'border',
            padding: 0
        } ,
        items: [ {
            region: 'center',
            layout: 'border',
            border: false,  
            tbar: getMapToolsBar(), 
            items: [{
                region: 'center',
                html: "<div id='map'></div>",
                border: false,
                header: false 
            }]
        } ]
    });
    //
    OpenLayers.ImgPath = "resources/OLThemes/opengeo/img/openlayers/";
    var map = new OpenLayers.Map('map');
    var layer = new OpenLayers.Layer.OSM("Simple OSM Map", null, null, { wrapDateLine: true });
	 
	map.addLayer(layer);
	map.zoomToMaxExtent();
    //var mapUtil = new GPSMobileMonitor.MapUtil();
   // mapUtil.addMap2Div('map');
}

var getMapToolsBar = function (){
	var tb = new Ext.Toolbar();
	tb.add( new Ext.Button({ 
	   	text: '原始视图', 
	   	iconCls: 'ZoomToMaxExtent',
	   	ToggleGroup:'OpenLayerTool',
	   	id:'ZoomToMaxExtent' 
	}));
 
	tb.add( new Ext.Button({ 
	   	text: '刷新地图', 
	   	iconCls: 'refreshMap',
	   	ToggleGroup:'OpenLayerTool',
	   	id:'refreshMap' 
	}));
	
	tb.add( new Ext.Button({ 
	   	text: '漫游', 
	   	iconCls: 'Navigation',
	   	ToggleGroup:'OpenLayerTool',
	   	id:'Navigation' 
	}));
	tb.add( new Ext.Button({ 
	   	text: '放大', 
	   	iconCls: 'ZoomIn',
	   	ToggleGroup:'OpenLayerTool',
	   	id:'ZoomIn' 
	}));
	tb.add( new Ext.Button({ 
	   	text: '缩小', 
	   	iconCls: 'ZoomOut',
	   	ToggleGroup:'OpenLayerTool',
	   	id:'ZoomOut' 
	}));
	tb.add( new Ext.Button({ 
	   	text: '测距', 
	   	iconCls: 'MeasureLine',
	   	ToggleGroup:'OpenLayerTool',
	   	id:'MeasureLine' 
	}));
	 
	tb.add( new Ext.Button({ 
	   	text: '测面积', 
	   	iconCls: 'MeasurePolygon',
	   	ToggleGroup:'OpenLayerTool',
	   	id:'MeasurePolygon' 
	}));
	 
	tb.add( new Ext.Button({ 
	   	text: '鹰眼图', 
	   	iconCls: 'world'
	}));
	
	 
	return tb;
};

/*地图图层切换*/
var onLayerItemClick = function(item){
    Ext.example.msg('Menu Click', 'You clicked the "{0}" menu item.', item.text);
}
/*地图工具条显示与隐藏*/
var onMapToolBarItemClick = function(item){
    Ext.example.msg('Menu Click', 'You clicked the "{0}" menu item.', item.text);
}
