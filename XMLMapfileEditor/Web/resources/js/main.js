Ext.ns("X");

var makeTab = function (id, url, title) {
    var win, 
        tab, 
        hostName, 
        exampleName, 
        node, 
        tabTip;
    
    if (id === "-") {
        id = Ext.id(undefined, "extnet");
        lookup[url] = id;
    }
    
    tabTip = url.replace(/^\//g, "");
    tabTip = tabTip.replace(/\/$/g, "");
    tabTip = tabTip.replace(/\//g, " > ");
    tabTip = tabTip.replace(/_/g, " ");
   
    hostName = window.location.protocol + "//" + window.location.host;
    exampleName = url;

    tab = Ext.getCmp("mainTabs").add({
        id   : id,
        tbar: ["->",  
        {
            text    : "Refresh",
            handler : function () {
//                Ext.getCmp(id).reload(true)
            },
            iconCls : "icon-arrowrefresh"
        } ],
        title  : title,
        tabTip: tabTip,
        frame: true,
        html: '<iframe id="test" src="' + url + '" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>',
        listeners : {
            deactivate : {
                fn : function (el) {
                    if (this.sWin && this.sWin.isVisible()) {
                         this.sWin.hide();
                    }
                }
            },
            
            destroy : function () {
                if (this.sWin) {
                    this.sWin.close();
                    this.sWin.destroy();
                }
            }
        },
        closable : true
    });

    Ext.getCmp("mainTabs").setActiveTab(tab);

//    var node = Ext.getCmp(id);
//            
//    if (node) {
//        node.ensureVisible(function () {
//            Ext.getCmp(this.id).select();
//        }, node);
//    } else {
//        Ext.getCmp("treePanel").on("load", function (node) {
//            node = Ext.getCmp(id);
//      
//            if (node) {
//                node.ensureVisible(function () {
//                    Ext.getCmp(this.id).select();
//                }, node);
//            }
//        }, this, { single : true });
//    }
};

var lookup = {};

var AddTab = function (href, id, title) {
    var tab = Ext.getCmp("mainTabs").getComponent(id),
        lObj = lookup[href];
        
    if (id == "-") {
        X.GetHashCode(href,{
            success: function (result) {
                AddTab(href, "e" + result, title);
            }
        });
        
        return;
    }
    
    lookup[href] = id;

    if (tab) {
        Ext.getCmp("mainTabs").setActiveTab(tab);
    } else {
        if (Ext.isEmpty(title)) {
            var m = /(\w+)\/$/g.exec(href);
            title = m == null ? "[No name]" : m[1];
        }
        
        title = title.replace(/<span>&nbsp;<\/span>/g, "");
        title = title.replace(/_/g, " ");
        makeTab(id, href, title);     
    }
};

var selectionChaged = function (dv, nodes) {
    if (nodes.length > 0) {
        var url = nodes[0].getAttribute("ext:url"),
            id = nodes[0].getAttribute("ext:id");
        
        AddTab(url, id, nodes[0].getAttribute("ext:title"));
    }
};

var viewClick = function (dv, e) {
    var group = e.getTarget("h2", 3, true);

    if (group) {
        group.up("div").toggleClass("collapsed");
    }
};

var beforeSourceShow = function (el) {
    var height = Ext.getBody().getViewSize().height;
    
    if (el.getSize().height > height) {
        el.setHeight(height - 20);
    }
};

var change = function (token) {
    if (token) {
        AddTab(token, lookup[token] || "-" );
    } else {
        mainTabs.setActiveTab(0);
    }
};

var addToken = function (el, tab) {
    if (tab.autoLoad && tab.autoLoad.url) {
        var host = window.location.protocol + "//" + window.location.host + "/Examples",
            token = tab.autoLoad.url.substr(host.length);
        
        if (!Ext.isEmpty(token)) {
            History1.add(token);
        }
    } else {                
        History1.add("");                
    }
};        

var keyUp = function (el, e) {
    var tree = treePanel,
        text = this.getRawValue();
    
    if (e.getKey() === 40) {
        tree.getRootNode().select();
    }
        
    if (Ext.isEmpty(text, false)) {
        clearFilter(el);
    }
    
    if (text.length < 3) {
        return;
    }
    
    tree.clearFilter();
    
    if (Ext.isEmpty(text, false)) {
        return;
    }
    
    el.triggers[0].show();
    
    if (e.getKey() === Ext.EventObject.ESC) {
        clearFilter(el);
    } else {
        var re = new RegExp(".*" + text + ".*", "i");
        
        tree.getRootNode().collapse(true,false);
        
        tree.filterBy(function (node) {
            var match = re.test(node.text.replace(/<span>&nbsp;<\/span>/g, "")),
                pn = node.parentNode;
                
            if (match && node.isLeaf()) {
               pn.hasMatchNode = true;
            }
            
            if (pn != null && pn.fixed) {
                if (node.isLeaf() === false) {
                    node.fixed = true;
                }
                return true;
            }            
                
            if (node.isLeaf() === false) {
                node.fixed = match;
                return match;
            }            
            
            return (pn != null && pn.fixed) || match;
        }, { expandNodes : false });
        
        tree.getRootNode().cascade(function (node) {
            if (node.isRoot) {
               return;
            }            
            
            if ((node.getDepth() === 1) || 
               (node.getDepth() === 2 && node.hasMatchNode)) {
               node.expand(false, false);
            }
            
            delete node.fixed;
            delete node.hasMatchNode;
        }, tree);
    }
};

var clearFilter = function (el, trigger, index, e) {
    var tree = treePanel;
    
    el.setValue(""); 
    el.triggers[0].hide();
    tree.clearFilter(); 
    tree.getRootNode().collapseChildNodes(true);    
    el.focus(false, 100);        
};

var filterSpecialKey = function (field, e) {
    if (e.getKey() == e.DOWN) {
        var n = treePanel.getRootNode().findChildBy(function (node) {
            return node.isLeaf() && !node.hidden;
        }, treePanel, true);
        
        if (n) {
            n.ensureVisible(function () {
                treePanel.getSelectionModel().select(n);
            } );            
        }
    }
};

var loadComments = function (at, url) {
    winComments.url = url;
    
    winComments.show(at, function () {
        updateComments(false, url);
        TagsView.store.reload();
    });
};

var updateComments = function (updateCount, url) {
    winComments.body.mask("Loading...", "x-mask-loading");
    Ext.net.DirectMethod.request({
        url: "/ExampleLoader.ashx",
        cleanRequest : true,
        params       : {
            url : url,
            action : "comments.build"                            
        },
        success      : function (result, response, extraParams, o) {
            if (result && result.length > 0) {
                tplComments.overwrite(CommentsBody.body, result);
            }
            
            if (updateCount) {
                mainTabs.getActiveTab().commentsBtn.setText("Comments ("+result.length+")");
            }
        },
        complete    : function (success, result, response, extraParams, o) {
            winComments.body.unmask();
        }
    });
};

if (window.location.href.indexOf("#") > 0) {
    var directLink = window.location.href.substr(window.location.href.indexOf("#") + 1);
    
    Ext.onReady(function () {
        if (!Ext.isEmpty(directLink, false)) {
            AddTab(directLink, "-");
        }
    }, window, { delay : 100 });
}

var ConnectionTest = function (urlHeader, provider, connectionStr) { 
    Ext.net.DirectMethod.request({
        url: urlHeader + "WebService.asmx/ConnectionTest",
        cleanRequest: true,
        params: {
            provider: provider,
            connectionStr: connectionStr
        },
        success: function (result) {
            Ext.Msg.alert('验证结果', result.text);
            //window.location.assign("index.aspx");
        }
    });
}

/**
*关闭当前活到tab签
*/
var CloseThisTab = function () {
    var tabs = null;
    if (typeof (mainTabs) != 'undefined')
        tabs = mainTabs;
    else if (typeof (parent.mainTabs) != 'undefined')
        tabs = parent.mainTabs;
  
   if (tabs == null) return;
     
    tabs.remove(tabs.activeTab);
}

/**
*grid 上下移动
*/
var moveGrid = function (grid, record, command) {
    var ds = grid.getStore();

    var rindex = ds.indexOf(record);

    if (command == 'delete') { 
        ds.remove(record);
        return;
    }

    rindex += (command == 'up') ? -1 : 1;  
    if (rindex < 0 || rindex > ds.getCount() - 1) {
        return;
    }
    ds.remove(record);
    ds.insert(rindex, record);
    grid.getSelectionModel().selectRecords([record]); ;
}

/**
*加载grid数据，生成动态列
*/
var LoadGridDataWithDynamic = function (grid, store, sql, dbconn, dbprovider) {
    Ext.net.DirectMethod.request({
        url: urlHeader + "WebService.asmx/GetSQLColumns",
        cleanRequest: true,
        params: {
            provider: dbprovider,
            connectionStr: dbconn,
            mySQL: sql
        },
        success: function (response, option) {
            var arrs = response.responseText.split("$$");
            var fd = "[" + arrs[0] + "]";
            var cm = "[" + arrs[1] + "]";
            //重新绑定store及column
            grid.reconfigure(
			new Ext.data.JsonStore({
			    url: "sample.cfc",
			    root: "data",
			    baseParams: { method: "getGridData", node: n.id },
			    totalProperty: "totalCount", id: "id", fields: fd
			}),
			new Ext.grid.ColumnModel(cm));
            //重新加载数据
            var store = grid.getStore();
            grid.getBottomToolbar().bind(store);
            store.load({ params: { start: 0, limit: 5} });
            //Ext.Msg.alert('验证结果', result.text); 
        }
    });
}

var addNode2Tree = function (treeRoot, text) {
    var destination = treeRoot; 
    var newNode = new Ext.tree.AsyncTreeNode({ text: text, leaf: false, nodeType: "node" });
    destination.getRootNode().appendChild(newNode);
    //destination.getRootNode().insertBefore(newNode, destination.getRootNode().item(0));

};

Ext.getUrlParam = function (param) {
    var params = Ext.urlDecode(location.search.substring(1));
    return param ? params[param] : params;
};

var deleteSelectedNodes = function (treePanel) { 
    var nodes = treePanel.getSelectionModel().getSelections();
    var ids = "";
    for (var i = 0; i < nodes.length; i++) {
        ids = ids + ";" + nodes[i].data.FileName;
    }
   
    Ext.Ajax.request({
        url: "/Web/Ashx/StoreDataDelete.ashx", 
        params: {
            ids: ids
        },
        success: function (result) {
            if (result.responseText != "1") {
                Ext.Msg.alert('Error', result.responseText);
            }
            else {
                treePanel.deleteSelected();
            }
        }
    });
};

var setTroggleEnabledNodes = function (treePanel) {
    var nodes = treePanel.getSelectionModel().getSelections();
    var ids = "";
    for (var i = 0; i < nodes.length; i++) {
        ids = ids + ";" + nodes[i].data.FileName;
    } 

    Ext.Ajax.request({
        url: "/Web/Ashx/StoreDataDelete.ashx",
        params: {
            ids: ids
        },
        success: function (result) {
            if (result.responseText != "1") {
                Ext.Msg.alert('Error', result.responseText);
            }
            else {
                treePanel.deleteSelected();
            }
        }
    });
};