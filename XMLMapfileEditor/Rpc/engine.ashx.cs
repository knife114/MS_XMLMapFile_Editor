using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using XMLMapfileEditor.EngineCore;
using XMLMapfileEditor.EngineCore.MapEditor;
using XMLMapfileEditor.EngineCore.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using XMLMapfile;

namespace XMLMapfileEditor.Rpc
{
    /// <summary>
    /// Summary description for engine
    /// </summary>
    public class engine : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            Factory factory = new Factory();
            try
            {
                NameValueCollection nvc = context.Request.Params;
                String result = "";
                string prjName = nvc["prjName"];
                switch (nvc["cmd"])
                {
                    case "getTreeNode":
                        result = factory.LoadJsonString(nvc["guid"], nvc["parentguid"], nvc["citype"]);
                        break;

                    case "getContent":
                        result = factory.LoadContentString(nvc["guid"], nvc["parentguid"], nvc["citype"]);
                        break;
                    case "saveContent":
                        result = factory.SaveContent(nvc["guid"], nvc["parentguid"], nvc["citype"], nvc["content"]);
                        break;
                    case "getJsonObject":
                        result = this.GetJsonObject(nvc);
                        break;
                    case "saveJsonObject":
                        result = this.SaveJsonObject(nvc);
                        break;
                        
                    case "deleteItem":
                        result = factory.DeleteItem(nvc["guid"], nvc["parentguid"], nvc["citype"]);
                        break;
                    case "createItem":
                        result = factory.CreateItem(nvc["name"], nvc["guid"], nvc["parentguid"], nvc["citype"]);

                        break;
                    case "createProject":
                        result = factory.CreateProject2(nvc["name"]);
                        break;
                    case "saveForm":
                        result = this.SaveForm(nvc);
                        break;

                    default: 
                        break;
                }//context.Response.StatusCode = 202;
                context.Response.ContentType = "text/plain";
                context.Response.Write(result);
            }
            catch (Exception ex)
            {
                object ojson = new { text = ex.Message };
                context.Response.StatusCode = 202;//- Accepted 已经接受请求，但处理尚未完成
                context.Response.ContentType = "text/plain";
                context.Response.Write(JsonConvert.SerializeObject(ojson));
            }

        }
        private string SaveJsonObject(NameValueCollection nvc)
        {
            //
            EditorFactory efac = new EditorFactory();
            CiType citype = Utility.EnumConvertor.ConvertFString<CiType>(nvc["citype"]);
            String result = "";
            switch (citype)
            {
                case CiType.MapXML:
                    efac.SaveJsonMap(nvc["guid"], nvc["content"]);
                    result = "1";
                    break;
                case CiType.LayerInclude:
                    result = efac.GetMapJsonLayers(nvc["guid"]);
                    break;
                case CiType.LayerXML:
                    efac.SaveJsonLayer(nvc["guid"], nvc["content"]);
                    break;
                case CiType.SymbolXML:
                    result = efac.GetJsonSymbol(nvc["guid"]);
                    break; 
                default:
                    ExtjsTree tree = new ExtjsTree() { Text = "ts" };
                    result = tree.toJson();
                    //result = "{text:'sdfd'}";
                    break;
            }
            return result;
        }
        private string GetJsonObject(NameValueCollection nvc)
        {
            //
            EditorFactory efac = new EditorFactory();
            CiType citype = Utility.EnumConvertor.ConvertFString<CiType>(nvc["citype"]);
            String result = "";
            switch (citype)
            {
                case  CiType.MapXML:
                    result = efac.GetJsonMap(nvc["guid"]);
                    break;
                case CiType.LayerInclude:
                    result = efac.GetMapJsonLayers(nvc["guid"]);
                    break;
                case CiType.LayerProj:
                    result = efac.GetProjJsonLayers(nvc["guid"]);
                    break;

                case CiType.SymbolXML:
                    result = efac.GetJsonSymbol(nvc["guid"]);
                    break;
                case CiType.LayerXML:
                    result = efac.GetJsonLayer(nvc["guid"]);
                    break;
               
                default:
                    ExtjsTree tree = new ExtjsTree() { Text = "ts" };
                    result = tree.toJson();
                    //result = "{text:'sdfd'}";
                    break;
            }
            return result;
        }
        private string SaveForm(NameValueCollection nvc)
        {
            //
            String result = "";
            switch (nvc["cmd"])
            {
                case "saveForm":
                    result = this.SaveForm(nvc);
                    break;

                default:
                    ExtjsTree tree = new ExtjsTree() { Text = "ts" };
                    result = tree.toJson();
                    //result = "{text:'sdfd'}";
                    break;
            }
            return result;
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

/*
 * prjName
 *      -Apache/htdocs/xx.pkg.html
 *      -httpd.d/xx.conf
 *      +apps/prjName
 *              +data
 *              +docs
 *              +etc
 *              +graphics
 *              +xmf
*/