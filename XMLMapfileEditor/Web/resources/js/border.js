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
            menu: [{ text: '添加新工程', addtype: 'addNewProject', handler: addNewItem },
            { text: '添加新子项', addtype: 'addNewItem', handler: addNewItem }, 
            { text: '删除', handler: deleteItem}]
        }],
        root: {
            name: 'Root',
            expanded: true,
            "singleClickExpand": true,
            guid:'r',parentguid:'r',citype:'AllProjects',
            children: []
        }
    });
    var cw;
    var titleHtml = "<div id='header' style='height:32px;'>";
//    titleHtml += "<a style='float:right;margin-right:10px;' href='http://www.osgeo.org/' target='_blank'>";
//    titleHtml += "<img style='margin-top: 4px;' src='resources/logo/logo.png' height=22/></a>";
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
            minWidth: 230,
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
    treePanel.addListener('itemexpand', treePanelExpand); 
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
                { text: '新建工程', handler: addNewItem }, '-',
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
    menuView.addNewItem(urlActionObj.cmdCreateProject, Ext.getCmp("treePanel").getRootNode());
};

var getIFrameMapWin = function(){
	return document.getElementById('iframeMapId').contentWindow; 
};

var getViewTypeItem = function(){
    var items = Ext.getCmp("MainMenuViewId").items;
};

var treePanelExpand = function (node) { 
    //folder 
    var folderName = '';
    var cnode = node; 
    loadTreeNode(cnode, urlActionObj.cmdGetTreeNode,
        node.data.guid, node.data.parentguid, node.data.citype);
};
  
function treePanelClick(view, node, item, index, event) {

    var id = "";
    var href = "";
    var title = "";
    if (node.data.leaf) {
        id = node.parentNode.data.text + node.data.text;
        href += "&guid=" + node.data.guid;
        href += "&parentguid=" + node.data.parentguid;
        href += "&citype=" + node.data.citype;
        if (node.data.citype.toLowerCase() == "httpddconf" ||
            node.data.citype.toLowerCase() == "pkghtml") {
            title = node.parentNode.data.text + "->" + node.data.text;
            href = "editor.html?prjName=" + node.parentNode.data.text + href;

        } else if (node.data.citype.toLowerCase() == "SymbolXML".toLowerCase()
                    || node.data.citype.toLowerCase() == "SymbolFile".toLowerCase()) {
            title = node.parentNode.parentNode.data.text + "->" + node.data.text;
            href = "symboleditor.html?prjName=" + node.parentNode.parentNode.data.text + href;
        } else if (node.data.citype.toLowerCase() == "LayerXML1".toLowerCase()) {
            title = node.parentNode.parentNode.data.text + "->" + node.data.text;
            href = "styleeditor.html?prjName=" + node.parentNode.parentNode.data.text + href;
        } else if (node.data.citype.toLowerCase() == "LayerXML".toLowerCase()) {
            title = node.parentNode.parentNode.data.text + "->" + node.data.text;
            href = "layereditor.html?prjName=" + node.parentNode.parentNode.data.text + href;
        } else if (node.data.citype.toLowerCase() == "MapXML".toLowerCase()) {
            title = node.parentNode.parentNode.data.text + "->" + node.data.text;
            href = "mapeditor.html?prjName=" + node.parentNode.parentNode.data.text + href;
        } else {
            title = node.parentNode.parentNode.data.text + "->" + node.data.text;
            href = "editor.html?prjName=" + node.parentNode.parentNode.data.text + href;
        }

        AddTab(href, id, title);
    } else {
        //folder  
        var cnode = node;
        if (cnode.data.expanded == false)
            cnode.expand();
        else {
            cnode.collapse();
            return;
        }  
    }
};
var initTree = function () {
    loadTreeNode(Ext.getCmp("treePanel").getRootNode(), 
                            urlActionObj.cmdGetTreeNode, "", "","AllProjects");
};

function loadTreeNode(node, cmd, guid, parentguid, citype) {
    Ext.Ajax.request({
        url: urlActionObj.engine,
        method: 'POST',
        params: {
            cmd: cmd,
            guid: guid,
            parentguid: parentguid,
            citype: citype
        },
        success: function (response, options) {
            var text = response.responseText;
            if (response.status == "200") {
                node.removeAll(true);
                if (node.data.addtype == "delete" && (node.data.citype == "Project" || node.leaf == true)) {
                    node.remove();
                }
                else if (text != "")
                    node.appendChild(Ext.decode(response.responseText));
            } else {
                Ext.MessageBox.alert(response.statusText, response.responseText);
                return;
            }

        },
        failure: function (response, options) {
            Ext.MessageBox.alert(response.statusText, response.responseText);
        }
    });
};
var deleteItem = function (o, e) {
    var sel = Ext.getCmp("treePanel").getSelectionModel().getLastFocused();

   if (sel != null) {
        sel.data.addtype = 'delete';
        loadTreeNode(sel, urlActionObj.cmdDeleteItem, sel.data.guid, sel.data.parentguid, sel.data.citype);
    } else
        Ext.MessageBox.alert('warning', 'please select a node item');
};
var addNewItem = function (o, e) {
    var sel = Ext.getCmp("treePanel").getSelectionModel().getLastFocused();
    var addtype = "";

    if (o.addtype == "addNewProject") {
        addtype = "Project";
        var proot = Ext.getCmp("treePanel").getRootNode();
        proot.data.addtype = addtype;
        menuView.addNewItem(urlActionObj.cmdCreateItem, proot);

    } else if (sel == null) {
        Ext.MessageBox.alert('warning', 'please select a node item');
    }
    else if (o.addtype == "addNewItem" && (sel.data.citype == "Map" || sel.data.citype == "Layers" || sel.data.citype == "Symbols")) {
        //addtype = "Map";
        sel.data.addtype = sel.data.citype;
        menuView.addNewItem(urlActionObj.cmdCreateItem, sel);
    }
    else if (o.addtype == "addNewItem" && (sel.data.citype == "MapXML" || sel.data.citype == "LayerXML" || sel.data.citype == "SymbolXML")) {
//        addtype = "MapXML";
        var node = sel.parentNode;
        node.data.addtype = sel.data.citype;
        menuView.addNewItem(urlActionObj.cmdCreateItem, node);
    }
    
};
 

var getPrjNode = function (node) {
    var rnode = node;
    while (rnode.isRoot() == false) {
        if (rnode.parentNode.isRoot()) {
            return rnode.parentNode;
        }
        rnode = rnode.parentNode;
    }
};

var getNode = function (node, addtype) {
    var rnode = getPrjNode(node);
    while (rnode.isRoot() == false) {
        if (rnode.parentNode.isRoot()) {
            return rnode.parentNode;
        }
        rnode = rnode.parentNode;
    }
};