
GPSMobileMonitor.MapUtil = function(){
	this.map = null;
	this.layer=null;
	this.layers = [];
	
	OpenLayers.ImgPath = "resources/OLThemes/opengeo/img/openlayers/";
	
	this.addMap2Div = function(mapId){
		this.map = new OpenLayers.Map(mapId);
		this.layer = new OpenLayers.Layer.OSM("Simple OSM Map", null, null, { wrapDateLine: true });
		 
		this.map.addLayer(layer);
		this.map.zoomToMaxExtent();
	};
	 
}

