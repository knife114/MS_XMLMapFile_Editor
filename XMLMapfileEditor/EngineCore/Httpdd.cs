using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XMLMapfileEditor.EngineCore
{
    public class Httpdd
    {
        public static string GetDefaultHttpddHtml(string aliasName )
        {
            string content = "Alias /${aliasName}/ \"/ms4w/apps/${aliasName}/\"\n\n";
            content += "<Directory \"/ms4w/apps/${aliasName}/\">\n";
            content += "\tAllowOverride None\n";
            content += "\tOptions Indexes FollowSymLinks Multiviews \n";
            content += "\tOrder allow,deny\n";
            content += "\tAllow from all\n";
            content += "</Directory>\n\n";
            content += "SetEnv MS_TILECACHE_CONFIG_FILE \"/ms4w/apps/${aliasName}/tilecache.cfg\"";

            content = content.Replace("${aliasName}", aliasName) ;
            return content;
        }
    }
}