using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XMLMapfileEditor.EngineCore
{
    public  class Pkg
    {
        public static string GetDefaultPkgHtml(string rootlink, string title)
        {
            string pkgHtml = "<h3>${APPTITLE}</h3>\n";
            pkgHtml += "<blockquote>\n";
            pkgHtml += "\t<p><a href=\" /${APPROOT}\">${APPTITLE}</a></p>\n";
            pkgHtml += "</blockquote>";

            pkgHtml = pkgHtml.Replace("${APPROOT}", rootlink).Replace("${APPTITLE}", title);
            return pkgHtml;
        }

        public static string Add1Link(string link, string title)
        {
            string pkgHtml = "";
            pkgHtml += "<blockquote>\n";
            pkgHtml += "\t<p><a href=\" /${APPROOT}\">${APPTITLE}</a></p>\n";
            pkgHtml += "</blockquote>";
            pkgHtml = pkgHtml.Replace("${APPROOT}", link).Replace("${APPTITLE}", title);
            return pkgHtml;
        }
    }
}