

// 声明一个全局对象Namespace，用来注册命名空间
Namespace = {};
Namespace.register = function (fullNS) {
    var nsArray = fullNS.split('.');
    var sEval = "";
    var sNS = "";
    for (var i = 0; i < nsArray.length; i++) {
        if (i != 0) sNS += ".";
        sNS += nsArray[i];
        sEval += "if (typeof(" + sNS + ") == 'undefined') " + sNS + " = new Object();"
    }
    if (sEval != "") eval(sEval);
}
// 注册命名空间Grandsoft.GEA, Grandsoft.GCM
Namespace.register("GeoCoolite");

GeoCoolite.ContextMenu = function (map, callback) {
    this.rootMenuID = "myRootMenu";
    this.mapContainerID = map.div.id;

    this.addRoot2ContextMenu = function () {
        $("body").append($("<ul id='myRootMenu' class='contextMenu'></ul>"));
    };
    this.addDefault = function () {
        $("#" + this.rootMenuID).append($("<li class='edit'><a href='#' actionName='zoomIn'>ZoomIn</a></li>"));
        $("#" + this.rootMenuID).append($("<li class='edit'><a href='#' actionName='zoomOut'>zoomOut</a></li>"));
        $("#" + this.rootMenuID).append($("<li class='edit'><a href='#' actionName='zoomToMaxExtent'>zoomToMaxExtent</a></li>"));
    };
    this.addSeparator = function () {
        $("#" + this.rootMenuID).append($("<li class='quit separator'><a href='#'>quit</a></li>"));
    };
    this.addItem = function (action, name, className) {
        var str = "<li class='{className}'><a href='#' actionName='{action}'>{name}</a></li>";
        str = str.replace("{action}", action);
        str = str.replace("{name}", name);
        if (className)
            str = str.replace("{className}", className);
        $("#" + this.rootMenuID).append($(str));
    };

    this.addRoot2ContextMenu();

    // Show menu when #myDiv is clicked
    $("#" + this.mapContainerID).contextMenu({
        menu: this.rootMenuID
    },
    function (action, el, pos) {
        if (action == "zoomIn") {
            map.zoomIn();
        }
        else if (action == "zoomOut") {
            map.zoomOut();
        }
        else if (action == "zoomToMaxExtent") {
            map.zoomToMaxExtent();
        }
        else {
            if (callback) callback(action, el, pos);
        }
    });

    // Disable cut/copy
    $("#disableItems").click(function () {
        $('#' + rootMenuID).disableContextMenuItems('#cut,#copy');
        $(this).attr('disabled', true);
        $("#enableItems").attr('disabled', false);
    });

    // Enable cut/copy
    $("#enableItems").click(function () {
        $('#' + rootMenuID).enableContextMenuItems('#cut,#copy');
        $(this).attr('disabled', true);
        $("#disableItems").attr('disabled', false);
    });

};
 
 
		