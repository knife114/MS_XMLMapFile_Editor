/**
*从导航菜单移除Node
*/
var removeNode = function (treeRoot) {
    var prjName = getSelectedNode(treeRoot).text;
    if (prjName == "") {
        alert("工程为空");
        return;
    }
    Ext.net.DirectMethod.request({
        url: "/Web/WebService/WebService.asmx/MapProject_DeleteFromDisk",
        cleanRequest: true,
        params: {
            prjName: prjName
        },
        success: function (result) {
            if (result.text == "1") {
                removeSelectedNode(treeRoot);
            }
            else
                Ext.Msg.alert('验证结果', result.text);
        }
    });
};

var setTitle = function (winNewPrjChildItem, treePanel) {
    var title = 'Add A New Project ';
    var node = treePanel.getSelectionModel().getSelectedNode();
    if (node.text == "Data") {
        title = title + "Data";
    }
    else if (node.text == "DataSources") {
        title = title + "DataSource";
    }
    else if (node.text == "Layers") {
        title = title + "Layer";
    }
    else if (node.text == "Maps") {
        title = title + "Map";
    }
    else if (node.text == "Styles") {
        title = title + "Style";
    }
    winNewPrjChildItem.setTitle(title);
};

var getSelectedNode = function (treeRoot) {
    return treeRoot.getSelectionModel().getSelectedNode();
};

var removeSelectedNode = function (treeRoot) {
    var selectedNode = getSelectedNode();
    treeRoot.removeNode(selectedNode);
};
function DisableNode(id) {
    var menu = TreeContextMenu;
    for (var i = 0; i < menu.items.items.length; i++) {
        if (id == menu.items.items[i].id)
            menu.items.items[i].disable();
    }
}
function showMenu(node, e) {
    var menu = TreeContextMenu;
    if (node.parentNode.parentNode==null && node.text.startWith("Prj_")==false) {
        return;
    }
    else if (node.parentNode.text.startWith("Plugins")) {
        return;
    }

    for (var i = 0; i < menu.items.items.length; i++) {
        menu.items.items[i].enable();
    }
    if (node.text.startWith("Prj_")) {
        DisableNode("miInsert");
        DisableNode("miAppend");
        DisableNode("miAdd");
    }
    else if (node.text == "Data" || node.text == "DataStores" ||
                        node.text == "Layers" || node.text == "Maps" || node.text == "Styles") {
        miRename.disable();
        miRemove.disable();
    }
    if (node.browserEvent) {
        this.menuNode = this.getRootNode();
        menu.nodeName = "";
        this.getSelectionModel().clearSelections();
        e = node;
    }
    else {
        this.menuNode = node;
        menu.nodeName = node.text;
        node.select();
    }

    menu.showAt([e.getXY()[0], e.getXY()[1] + 5]);
    e.stopEvent();
}
var SetLanguage = function (language) {
    Ext.net.DirectMethod.request({
        url: "WebService/WebService.asmx/SetLanguage",
        cleanRequest: true,
        params: {
            language: language
        },
        success: function (result) {
            window.location.assign("index.aspx");
        }
    });
}
var addProjectServicce = function (prjName) {
    if (prjName == "") {
        Ext.Msg.alert('Error', "工程名不能为空");
        return;
    }
    prjName = "Prj_" + prjName;
    var destination = treePanel;
    var root = destination.getRootNode();
    for (var i = 0; i < root.childNodes.length; i++) {
        if (root.childNodes[i].text.toLowerCase() == prjName.toLowerCase()) {
            Ext.Msg.alert('Warning', '已存在相同工程.');
            return;
        }
    }

    Ext.net.DirectMethod.request({
        url: "WebService/WebService.asmx/AddNewProject",
        cleanRequest: true,
        params: {
            prjName: prjName
        },
        success: function (result) {
            if (result.text != "1") {
                Ext.Msg.alert('Error', result.text);
            }
            else {
                addGroup(prjName);
            }
        }
    });
};
var addPrjChildServicce = function (prjName) {
    if (prjName == "") {
        Ext.Msg.alert('Error', "工程名不能为空");
        return;
    }
    prjName = "Prj_" + prjName;
    var destination = treePanel;
    var root = destination.getRootNode();
    for (var i = 0; i < root.childNodes.length; i++) {
        if (root.childNodes[i].text.toLowerCase() == prjName.toLowerCase()) {
            Ext.Msg.alert('Warning', '已存在相同工程.');
            return;
        }
    }

    Ext.net.DirectMethod.request({
        url: "WebService/WebService.asmx/AddNewProject",
        cleanRequest: true,
        params: {
            prjName: prjName
        },
        success: function (result) {
            if (result.text != "1") {
                Ext.Msg.alert('Error', result.text);
            }
            else {
                addGroup(prjName);
            }
        }
    });
};

var addGroup = function (text) {
    var destination = treePanel;

    var newNode = new Ext.tree.TreeNode({ text: text, leaf: false, nodeType: "node", singleClickExpand: true });
    //destination.getRootNode().appendChild(newNode);
    destination.getRootNode().insertBefore(newNode, destination.getRootNode().item(0));

    addGroupItem(newNode, "Data");
    addGroupItem(newNode, "DataStores");
    addGroupItem(newNode, "Layers");
    addGroupItem(newNode, "Maps");
    addGroupItem(newNode, "Styles");
};
var addGroupItem = function (destination, text) {
    destination.appendChild(new Ext.tree.AsyncTreeNode({ text: text, leaf: false, singleClickExpand: true }));
};

var setInsertDataStoreDataType = function (cbDataType, txtConnectionStr, cbSelectData, txtName, txtTitile) {
    var selText = cbDataType.getText().toLowerCase();  
    txtConnectionStr.hide();
    cbSelectData.hide();
   
    if (selText.startWith("db=")) {
        txtConnectionStr.show();
        txtConnectionStr.setValue(cbDataType.getValue());
        txtName.setValue(selText.replace("db=",""));
        txtTitile.setValue(selText.replace("db=", ""));
    }
    else if (selText.startWith("file=")) {
        cbSelectData.show();
        txtName.setValue("");
        txtTitile.setValue("");
        txtConnectionStr.setValue("");
        //txtSelectData.setValue(cbDataType.getValue())
    }
};

var saveNewDataStore = function (cbDataType, txtConnectionStr, cbSelectData,
                                                txtName, txtTitile, txtDescription, txtCharset) {
    Ext.Ajax.request({
        url: "/Web/Ashx/StoreDataStoresSave.ashx",
        params: {
            prjName: Ext.getUrlParam('prjName'),
            Name: txtName.getValue(),
            //FileName: "data/" + cbSelectData.getValue() + txtName.getValue(),
            Enabled: 'true',
            Charset: txtCharset.getValue(),
            DataPath: cbSelectData.getValue(),
            DSType: cbDataType.getText(),
            DBConnection: txtConnectionStr.getValue()
        },
        success: function (result) {
            if (result.responseText != "1") {
                Ext.Msg.alert('Error', result.responseText);
            }
            else {
                gridPanelDataStores.store.reload();
                Ext.Msg.alert('Success', "保存成功");
            }
        }
    });
};

var saveNewMap = function (txtName, storeMapsLayers, Minx, Maxx, Miny, Crs) {
    var layers = "";
    if (typeof(storeMapsLayers) != "undefined" && storeMapsLayers != null) {
        for (var i = 0; i < storeMapsLayers.getCount(); i++) {
            if (i == 0) layers = storeMapsLayers.getAt(i).data.LayerName;
           else layers = layers + ";" + storeMapsLayers.getAt(i).data.LayerName;
        }
    }
    Ext.Ajax.request({
        url: "/Web/Ashx/StoreMapsSave.ashx",
        params: {
            prjName: Ext.getUrlParam('prjName'),
            Name: txtName,
            FileName: txtName,
            layers: layers,
            Minx: Minx,
            Maxx: Maxx,
            Miny: Miny,
            Crs: Crs
        },
        success: function (result) {
            if (result.responseText != "1") {
                Ext.Msg.alert('Error', result.responseText);
            }
            else {
                gridPanelMaps.store.reload();
                //Ext.Msg.alert('Success', "保存成功");
            }
        }
    });
};
var isExist = function () {
    
};
var MapCommand = function (command, record) {
    command = command.toLowerCase();
    if (command == "EditMapLayers".toLowerCase()) {
        dfMapName.setValue(record.Name);
        StoreMapsLayers.reload();
        StoreLayers.reload();
        winAddLayers2Map.show();
    }
};


var addRecordLayer = function () {
    var record = new Ext.data.Record;
    record.set("LayerName", cbDataType.getText());
    StoreMapsLayers.add(record);
};

var saveNewStyle = function (name,contents) {
   
    Ext.Ajax.request({
        url: "/Web/Ashx/StoreStylesSave.ashx",
        params: {
            prjName: Ext.getUrlParam('prjName'),
            Name: name, 
            Contents: contents 
        },
        success: function (result) {
            if (result.responseText != "1") {
                Ext.Msg.alert('Error', result.responseText);
            }
            else {
                gridPanelStyles.store.reload();
            }
        }
    });
};

var testUSStore = function () {
    var obj = StoreLayerStyle1;
};