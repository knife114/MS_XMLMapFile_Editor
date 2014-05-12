Ext.namespace('MSEditor');

MSEditor.ServerAction = function () {
    var urlActionObj = new GPSMobileMonitor.Controler.URL.Action();
    var editor = null;
    /*
    *加载treenode，包括删除
    */
    this.loadTreeNode = function (node, cmd, guid, parentguid, citype) {
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
                var responseText = response.responseText;
                if (response.status == "200") {
                    node.removeAll(true);
                    if (node.data.addtype == "delete" &&
                        (node.data.citype == "Project" || node.leaf == true)) {
                        node.remove();
                    }
                    else if (responseText != "")
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

    this.getContent = function (guid, parentguid, citype, fn) {
        Ext.Ajax.request({
            url: urlActionObj.engine,
            params: {
                cmd: urlActionObj.cmdGetContent,
                guid: guid,
                parentguid: parentguid,
                citype: citype
            },
            success: function (response, options) {
                var responseText = response.responseText;
                if (response.status != "200") {
                    Ext.MessageBox.alert(response.statusText, response.responseText);
                    return;
                }
                if (typeof (fn) !== 'undefined' && fn !== null) {
                    fn(responseText);
                    return;
                }
                if (typeof (control) == 'undefined' || control == null || control == "") {
                    return;
                }

            },
            failure: function (response, options) {
                Ext.MessageBox.alert(response.statusText, response.responseText);
            }
        });
    };

    this.saveContent = function (guid, parentguid, citype, content, cmd) {

        var mcmd = urlActionObj.cmdSaveContent;
        if (typeof (cmd) !== "undefined" && cmd !== null) {
            mcmd = cmd;
        }
        Ext.Ajax.request({
            url: urlActionObj.engine,
            method: 'POST',
            params: {
                cmd: mcmd,
                guid: guid,
                parentguid: parentguid,
                citype: citype,
                content: content
            },
            success: function (response, options) {
                var responseText = response.responseText;
                if (response.status != "200") {
                    Ext.MessageBox.alert("Error", responseText);
                }
                else  
                    Ext.MessageBox.alert("Success", "Save Successfully!");
            },
            failure: function (response, options) {
                Ext.MessageBox.alert(response.statusText, response.responseText);
            }
        });
    };

    this.getJsonObject = function (guid, parentguid, citype, fn) {
        Ext.Ajax.request({
            url: urlActionObj.engine,
            params: {
                cmd: urlActionObj.cmdGetJsonObject,
                guid: guid,
                parentguid: parentguid,
                citype: citype
            },
            success: function (response, options) {
                var responseText = response.responseText;
                if (response.status != "200") {
                    Ext.MessageBox.alert("Error", response.responseText);
                    return;
                }
                if (typeof (fn) !== 'undefined' && fn !== null) {
                    fn(responseText);
                }
            },
            failure: function (response, options) {
                Ext.MessageBox.alert(response.statusText, response.responseText);
            }
        });
    };

    this.DownLoad = function (guid, parentguid, citype, cmd) {

        var url = urlActionObj.engine + "?guid=" + guid;
        url += "&parentguid=" + parentguid;
        url += "&citype=" + citype;
        url += "&cmd=" + cmd;

        window.open(url);
    };
}
