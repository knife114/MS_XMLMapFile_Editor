 
Namespace = new Object();
 
Namespace.register = function(fullNS)
{ 
    var nsArray = fullNS.split('.');
    var sEval = "";
    var sNS = "";
    for (var i = 0; i < nsArray.length; i++)
    {
        if (i != 0) sNS += ".";
         sNS += nsArray[i];
        
         sEval += "if (typeof(" + sNS + ") == 'undefined') " + sNS + " = new Object();"
     }
    if (sEval != "") eval(sEval);
}
Namespace.register("GPSMobileMonitor");
Namespace.register("GPSMobileMonitor.MainMenu");
Namespace.register("GPSMobileMonitor.Controler");
Namespace.register("GPSMobileMonitor.Controler.URL");
 