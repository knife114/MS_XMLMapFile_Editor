using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using XMLMapfileEditor.EngineCore.MapEditor;
using Newtonsoft.Json;
using XMLMapfile;

namespace XMLMapfileEditor.test
{
    /// <summary>
    /// Summary description for Handler1
    /// </summary>
    public class Handler1 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
          string  result = JsonConvert.SerializeObject(new Map());
            context.Response.ContentType = "text/plain";
            context.Response.Write(result);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}