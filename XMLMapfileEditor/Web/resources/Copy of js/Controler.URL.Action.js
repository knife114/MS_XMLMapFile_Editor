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
    this.cmdCreateMap = "createMap";
    this.cmdCreateSysmol = "createSysmol";

    this.cmdGetTreeNode = "getTreeNode";
    //this.cmdGetAllProjects = "AllProjects";
}