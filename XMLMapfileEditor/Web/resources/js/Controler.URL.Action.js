/*
 * 
 */
GPSMobileMonitor.Controler.URL.Action = function () {
    this.Id = "1L";
    this.Name = "name";
    this.TerminalQuery = "rpc/terminal.query.php";
    this.TerminalOperator = "rpc/terminal.operator.php";
    this.engine = "/Rpc/engine.ashx";

    this.cmdGetPkg = "getPkg";
    this.cmdSavePkg = "savePkg";

    this.cmdGetHttdd = "getHttdd";
    this.cmdSaveHttdd = "saveHttdd";
    this.cmdCreateProject = "createProject";
    this.cmdCreateItem = "createItem"; 

    this.cmdGetTreeNode = "getTreeNode";
    this.cmdGetContent = "getContent";
    this.cmdSaveContent = "saveContent";
    this.cmdGetJsonObject = "getJsonObject";
    this.cmdSaveJsonObject = "saveJsonObject";

    this.cmdDeleteItem = "deleteItem";

    this.cmdGetLayer = "getContent";
    this.cmdGetStyle = "getStyle";
}