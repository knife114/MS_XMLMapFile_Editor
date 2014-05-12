/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact
*/

var urlActionObj;
 
var menuView;
//GPSMobileMonitor =  function(){};
//GPSMobileMonitor.prototype.treePanel="" ;

Ext.require(['*']);
Ext.onReady(function () {
    urlActionObj = new GPSMobileMonitor.Controler.URL.Action();

    var treePanel = Ext.create('Ext.tree.Panel', {
        height: '100%',
        width: '100%',
        hideHeaders: true,
        id: 'treePanel',
        rootVisible: false,
        useArrows: true,
        tbar: [{
            xtype: 'triggerfield',
            emptytext: 'Menu Button'
        }, {
            xtype: 'splitbutton',
            text: '添加',
            iconCls: 'add16',
            menu: [{ text: '添加新工程', handler: addNewPrj },
            { text: '添加新Map', handler: addMap },
            { text: '添加新Sysmol', handler: addSysmol}]
        }],
        root: {
            name: 'Root',
            expanded: true,
            "singleClickExpand": true,
            children: []
        }
    });
    var cw;
    var titleHtml = "<div id='header' style='height:32px;'>";
    titleHtml += "<a style='float:right;margin-right:10px;' href='http://www.osgeo.org/' target='_blank'>";
    titleHtml += "<img style='margin-top: 4px;' src='resources/logo/logo.png' height=22/></a>";
    titleHtml += "<a style='float:right;margin-right:10px;' href='http://http://mapserver.org/' target='_blank'>";
    titleHtml += "<img style='margin-top: 4px;' src='resources/logo/banner.png' height=22/></a>";

    titleHtml += "<a style='float:right;margin-right:10px;' href='http://www.mapviews.cn/' target='_blank'>";
    titleHtml += "<img style='margin-top: 4px;' src='resources/images/6.png' height=22/></a>";

    titleHtml += "<div class='api-title'>XMLMapfile Editor Center for Mapserver(0.1 alpha)</div></div>";

    //alert(GPSMobileMonitor.Controler.URL.Config.Name);
    Ext.create('Ext.Viewport', {
        layout: {
            type: 'border',
            padding: '1 2 0 2'
        },
        defaults: {
            split: true
        },
        items: [{
            region: 'north',
            header: false,
            border: false,
            collapsible: false, draggable: false,
            bbar: getMainbbar(),
            html: titleHtml
        }, {
            region: 'west',
            collapsible: false,
            title: '导航区',
            split: true,
            width: '20%',
            minWidth: 100,
            Margins: '4 0 0 4',
            items: [treePanel]
        }, {
            xtype: 'tabpanel',
            id: 'mainTabs',
            region: 'center',
            layout: 'border',
            padding: 0,
            Margins: 0,
            border: false,
            items: [{
                title: '主编辑区',
                layout: 'border',
                id: 'maparea',
                items: [
					{
					    region: 'center',
					    html: "<iframe id='iframeMapId' name='iframeMapId' src='edito2r.html' width=100% height=100% frameborder=0></iframe>",
					    header: false,
					    minHeight: 80
					}]
            }]
        }, {
            // lazily created panel (xtype:'panel' is default)
            region: 'south',
            header: false,
            margins: '0 0 0 0',
            bbar: {
                statusAlign: 'right', // the magic config
                items: [{
                    text: '服务器时间：'
                }, '-', 'Plain Text', ' ', ' ']
            }
        }]
    });

    menuView = new GPSMobileMonitor.MainMenu.MenuView(treePanel);
    treePanel.addListener('itemclick', treePanelClick);
    initTree();
});

var getCenter = function (){
	var tb = new Ext.Panel();
	return tb;
}
var getMainbbar = function (){
	var tb = new Ext.Toolbar();
	tb.add(getMainMenuFile());
	tb.add(getMainMenuView());
	tb.add(getMainMenuPlugin()); 
	tb.add(getMainMenuMap()); 
	tb.add(getMainMenuOptions()); 
	tb.add(getMainMenuHelpManual());
	return tb;
};

var getMainMenuFile = function () {
    var sb = new Ext.SplitButton({
        text: '文件',
        iconCls: 'icon-add',
        menu: new Ext.menu.Menu({
            items: [
                { text: '新建工程', handler: addNewPrj }, '-',
		        { text: '打开所有已有工程' }, '-',
                { text: '保存当前工程' },
                { text: '另存为工程' },
                { text: '保存所有工程' }, '-',
		        { text: 'Mapserver设置' }
	        ]
        })
    });

    return sb;
};
var getMainMenuView = function(){
	var sb = new Ext.SplitButton({ 
	   	text: '查看', 
	   	iconCls: 'icon-add',
	   	id:'MainMenuViewId',
	   	menu: new Ext.menu.Menu({
	        items: [
	        	
		        {
		        	text: '显示个人',
	                checked: false,     
	                tooltip:'只显示当前登录用户的信息'
	             },{
			        	text: '按用户查看',
		                checked: true, 
		                //handler: menuView.getTerminals,
		                viewType: 'username',
		                group: 'viewType',
		                tooltip:''
		         },{
			        	text: '按终端号查看',
		                checked: false, 
		                viewType: 'phonenumber',
		                handler: showWestByViewType,
		                group: 'viewType',
		                tooltip:''
		         } ,
		        {text: '导入Shapefile地图文件'}
	        ]
	   	})
	});

	return sb;
};
var getMainMenuPlugin = function(){
	var sb = new Ext.SplitButton({ 
	   	text: '插件', 
	   	iconCls: 'icon-add',
	   	id:'MainMenuPluginId',
	   	menu: new Ext.menu.Menu({
	        items: [
	        	
		        {
		        	text: '数据库查看',
	                checked: false,     
	                tooltip:'只显示当前登录用户的信息'
	             },{
			        	text: '空间数据查看',
		                checked: true,  
		                viewType: 'username', 
		                tooltip:''
		         } 
	        ]
	   	})
	});

	return sb;
};
var getMainMenuMap = function(){
	
	var menu = Ext.create('Ext.menu.Menu', {
        id: 'mainMapMenu',
        style: {
            overflow: 'visible'     // For the Combo popup
        },
        items: [ 
            {
                text: '地图工具条显示',
                id:'mapToolbarShow',
                checked: true,   
                checkHandler: showMapToolbar
            }, '-', {
                text: '地图切换',
                menu: {        // <-- submenu by nested config object
                    items: [
                        // stick any markup in a menu
                        '<b class="menu-title">请选择一个地图底图</b>',
                        {
                            text: 'Google Street',
                            checked: true,
                            group: 'mapLayer',
                            checkHandler: onLayerItemCheck
                            
                        }   ,{
                            text: 'BaiduMap',
                            checked: true,
                            group: 'mapLayer',
                            checkHandler: onLayerItemCheck
                        } 
                    ]
                }
            }
            ,{
                text: '三维地图',
                id:'mapToolbar3D',
                checked: false, 
                checkHandler: onLayerItemCheck
            }  
        ]
    });
	var sb = new Ext.SplitButton({ 
	   	text: '地图', 
	   	iconCls: 'icon-add',
	   	menu: menu
	});
	return sb;
};
var getMainMenuOptions = function(){
	var sb = new Ext.SplitButton({ 
	   	text: '工具', 
	   	iconCls: 'icon-add',
	   	menu: new Ext.menu.Menu({
	        items: [
				{text: '导入'},
				{text: '导出'},
		        {text: '系统状态'},
		        {text: '用户信息'},
		        {text: '角色信息'}
	        ]
	   	})
	});

	return sb;
};
 
var getMainMenuHelpManual = function(){
	var sb = new Ext.SplitButton({ 
	   	text: '帮助手册', 
	   	iconCls: 'icon-add',
	   	menu: new Ext.menu.Menu({
	        items: [
	        	
		        {text: '全屏显示'},
		        {text: '导入GPS轨迹文件'},
		        {text: '导入Shapefile地图文件'}
	        ]
	   	})
	});

	return sb;
};
 

var showWestByViewType = function(item){
	var type = item.viewType; 
};


var showMapToolbar = function(){
	 
};
var onLayerItemCheck = function(){
	 
};

var getIFrameMapWin = function(){
	return document.getElementById('iframeMapId').contentWindow; 
};

var getViewTypeItem = function(){
    var items = Ext.getCmp("MainMenuViewId").items;  
};

var addNewPrj = function () {
    menuView.addNewItem(urlActionObj.cmdCreateProject, Ext.getCmp("treePanel").getRootNode());
};

function treePanelClick(view, node, item, index, event) {
     
    var id = "";
    var href = "";
    var title = "";
    if (node.data.leaf) {
        id = node.data.text;
        if (node.parentNode.data.text.toLowerCase() == "httpd.d") {
            title = node.parentNode.parentNode.data.text + "->" + node.data.text;
            href = "editor.html?prjName=" + node.parentNode.parentNode.data.text;
            href += "&id=" + id;
            href += "&cmd=" + urlActionObj.cmdGetHttdd + "," + urlActionObj.cmdSaveHttdd;
            href += "&type=httdd";
        } else if (node.parentNode.data.text.toLowerCase() == "apache/htdocs") {
            title = node.parentNode.parentNode.data.text + "->" + node.data.text;
            href = "editor.html?prjName=" + node.parentNode.parentNode.data.text;
            href += "&id=" + id;
            href += "&cmd=" + urlActionObj.cmdGetPkg + "," + urlActionObj.cmdSavePkg;
            href += "&type=pkg";

        } else if (node.parentNode.data.text.toLowerCase() == "apps") {
        }

        AddTab(href, id, title);
    } else {
        //folder 
        var folderName ='';
        var cnode = node;
        if (cnode.data.expanded == false)
            cnode.expand();
        else {
            cnode.collapse();   
            return;
        }

        while (node != null) {
            folderName = node.data.text + "/" + folderName;
            if (node.parentNode.data.text == "Root") { 
                loadTreeNode(cnode, urlActionObj.cmdGetTreeNode, node.data.text, folderName);
                break;
            }
            node = node.parentNode;
        }
        
    }
}
var initTree = function () {
    loadTreeNode(Ext.getCmp("treePanel").getRootNode(), 
                            urlActionObj.cmdGetTreeNode, "", "");
};

function loadTreeNode(node, cmd, prjName, folderName) {
    Ext.Ajax.request({
        url: urlActionObj.engine,
        method: 'POST',
        params: {
            cmd: cmd,
            guid: '' ,
            parentguid: '',
            citype: 'AllProjects'
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

var addSysmol = function () {
    var sel = Ext.getCmp("treePanel").getSelectionModel().getLastSelected();

    if (sel != null) {
        menuView.addNewItem(urlActionObj.cmdCreateMap, getPrjNode());
    }
};
var addMap = function () {
    var sel = Ext.getCmp("treePanel").getSelectionModel().getLastSelected();

    if (sel != null) {
        menuView.addNewItem(urlActionObj.cmdCreateSysmol, getPrjNode() );
    }

};

var getPrjNode = function (node) {
    while (node.isRoot() == false  ) {
        if (node.parentNode.isRoot()) {
            return node.parentNode; 
        }
        node = node.parentNode;
    }
};