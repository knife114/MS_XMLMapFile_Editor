using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using XMLMapfile;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using XMLMapfileEditor.EngineCore.DaoService;
using XMLMapfileEditor.EngineCore.Model;

namespace XMLMapfileEditor.EngineCore
{
    public class Factory
    {
        MSDaoService dao = new MSDaoService();
        public string DeleteItem(string guid, string parentguid, string citype)
        {
            this.dao.Delete(guid);
            return "";
        }
        public string CreateItem(string name, string guid, string parentguid, string citype)
        {
            return CreateItem(name, guid, parentguid, Utility.EnumConvertor.ConvertFString<CiType>(citype));
        }
        
        public string CreateItem(string name, string guid, string parentguid, CiType citype)
        {
            if (citype == CiType.Project)
            {
                return this.CreateProject2(name);
            }
            else if (citype == CiType.Httpdd)
            {
                return this.Insert(name, guid, CiType.HttpddConf, Httpdd.GetDefaultHttpddHtml(name));
            }
            else if (citype == CiType.Pkg)
            {
                return this.Insert(name, guid, CiType.PkgHtml, Pkg.GetDefaultPkgHtml(name, name));
            }
            else if (citype == CiType.Layers)
            {
                Layer layer = new Layer() { name = name };
                return this.Insert(name, guid, CiType.LayerXML, Utility.XMLUtil.SerializeXML<Layer>(layer));
            }
            else if (citype == CiType.Symbols)
            {
                Symbol symbol = new Symbol() { name = name };
                return this.Insert(name, guid, CiType.SymbolXML, Utility.XMLUtil.SerializeXML<Symbol>(symbol));
            }
            else if (citype == CiType.Map)
            {
                Map map = new Map() { name = name };
                map.Web.Add(new Web() { maxScaleDenom=0,  minScaleDenom=0 });
                return this.Insert(name, guid, CiType.MapXML, Utility.XMLUtil.SerializeXML<Map>(map));
            }
            else
                return "";
        }
        public string CreateProject2(string prjName)
        {
            //Project----------------------------------
            MSObject prjObj = new MSObject();
            prjObj.Name = prjName;
            prjObj.CiType = CiType.Project;
            prjObj.Flag = Flag.OK;
            dao.Insert(prjObj);
            //Pkg----------------------------------
            MSObject prjPKG = new MSObject();
            prjPKG.Name = prjName + ".pkg.html";
            prjPKG.ParentGuid = prjObj.Guid;
            prjPKG.CiType = CiType.  PkgHtml;
            prjPKG.Content = this.GetPkgHtml(prjName);
            prjPKG.Flag = Flag.OK;
            dao.Insert(prjPKG);

            //Pkg----------------------------------
            MSObject prjHttpdd = new MSObject();
            prjHttpdd.Name = prjName + ".conf";
            prjHttpdd.ParentGuid = prjObj.Guid;
            prjHttpdd.CiType = CiType.HttpddConf;
            prjHttpdd.Content = this.GetHttdd(prjName);
            prjHttpdd.Flag = Flag.OK;
            dao.Insert(prjHttpdd);

            List<object> lstObjects = new List<object>();
            {
                lstObjects.Add(new { text = prjObj.Name, leaf = false, guid = prjObj.Guid, parentguid = "", citype = CiType.Project.ToString() });
            }
            return JsonConvert.SerializeObject(lstObjects);
        }

        public string SaveContent(string guid, string parentguid, string citype, string content)
        {
            CiType ecitype = Utility.EnumConvertor.ConvertFString<CiType>(citype);
            var qObj = this.dao.Query(guid);
            qObj.Content = content;

            if (ecitype == CiType.SymbolXML || ecitype == CiType.SymbolFile)
            {
                JContainer o = (JContainer)JsonConvert.DeserializeObject(content);
                CiType icitype = Utility.EnumConvertor.ConvertFString<CiType>((String)o["citype"]);

                if(icitype== CiType.SymbolXML)
                    Utility.XMLUtil.DeserializeXML<Symbol>(content);

                qObj.CiType = icitype;
                qObj.Content = (String)o["content"] ;
            } 
            this.dao.Update(qObj);
            return "";
        }
         public string LoadContentString(string guid, string parentguid, string citype)
        {
            return this.LoadContentString(guid, parentguid, Utility.EnumConvertor.ConvertFString<CiType>(citype));
        }
        public string LoadContentString(string guid, string parentguid, CiType citype)
        {
            if (citype == CiType.PkgHtml || citype == CiType.HttpddConf || citype == CiType.LayerXML
                 || citype == CiType.SymbolXML || citype == CiType.SymbolFile
                 || citype == CiType.GraphicImg || citype == CiType.MapXML)
            {

                var qObj = this.dao.Query(guid);
                
                return JsonConvert.SerializeObject(new { content = qObj.Content, citype = qObj.CiType.ToString() });
            }
            else return "";
        }
        public string LoadJsonObjectString(string guid, string parentguid, string citype)
        {
            return this.LoadContentString(guid, parentguid, Utility.EnumConvertor.ConvertFString<CiType>(citype));
        }
         
        public string LoadJsonString(string guid, string parentguid, string citype)
        {
            return this.LoadJsonString(guid, parentguid, Utility.EnumConvertor.ConvertFString<CiType>(citype));
        }
        public string LoadJsonString(string guid, string parentguid, CiType citype)
        {
            if (citype == CiType.AllProjects)
            {
                var qObj = new MSObject() { CiType = CiType.Project };
                var lst = this.dao.Query(qObj);
                List<object> lstObjects = new List<object>();
                foreach (MSObject o in lst)
                {
                    lstObjects.Add(new { text = o.Name, leaf = false, guid = o.Guid, parentguid = o.ParentGuid, citype = o.CiType.ToString() });
                }
                return JsonConvert.SerializeObject(lstObjects);
            }
            else if (citype == CiType.Project)
            {
                List<object> lstObjects = new List<object>();
                {
                    lstObjects.Add(new { text = "pkg", leaf = false, guid = guid, parentguid = guid, citype = CiType.Pkg.ToString() });
                    lstObjects.Add(new { text = "app", leaf = false, guid = guid, parentguid = guid, citype = CiType.App.ToString() });
                    lstObjects.Add(new { text = "httpdd", leaf = false, guid = guid, parentguid = guid, citype = CiType.Httpdd.ToString() });
                }
                return JsonConvert.SerializeObject(lstObjects);
            }
            else if (citype == CiType.App)
            {
                List<object> lstObjects = new List<object>();
                {
                    lstObjects.Add(new { text = "Layers", leaf = false, guid = guid, parentguid = guid, citype = CiType.Layers.ToString() });
                    lstObjects.Add(new { text = "Fonts", leaf = false, guid = guid, parentguid = guid, citype = CiType.Fonts.ToString() });
                    lstObjects.Add(new { text = "Map", leaf = false, guid = guid, parentguid = guid, citype = CiType.Map.ToString() });
                    lstObjects.Add(new { text = "Sysmols", leaf = false, guid = guid, parentguid = guid, citype = CiType.Symbols.ToString() });
                    lstObjects.Add(new { text = "Etc", leaf = false, guid = guid, parentguid = guid, citype = CiType.Etc.ToString() });
                    lstObjects.Add(new { text = "Data", leaf = false, guid = guid, parentguid = guid, citype = CiType.Data.ToString() });
                    lstObjects.Add(new { text = "Graphics", leaf = false, guid = guid, parentguid = guid, citype = CiType.Graphics.ToString() });
                }
                return JsonConvert.SerializeObject(lstObjects);
            }
            else if (citype == CiType.Pkg)
            { 
                return GetJsonNode(guid, CiType.PkgHtml);
            }
            else if (citype == CiType.Httpdd)
            { 
                return GetJsonNode(guid, CiType.HttpddConf);
            }
            else if (citype == CiType.Layers )
            {
                return GetJsonNode(guid, CiType.LayerXML);
            }
            else if (citype == CiType.Map)
            {
                return GetJsonNode(guid, CiType.MapXML);
            }
            else if (citype == CiType.Symbols)
            {
                IList<CiType> lst = new List<CiType>() { CiType.SymbolXML, CiType.SymbolFile };
                return GetJsonNode(guid, lst);
            }
            else if (citype == CiType.PkgHtml || citype == CiType.Httpdd || citype == CiType.LayerXML
                || citype == CiType.SymbolXML || citype == CiType.SymbolFile 
                || citype == CiType.GraphicImg || citype == CiType.MapXML)
            {
                var qObj = new MSObject() { ParentGuid = guid, CiType = citype };
                var lst = this.dao.QueryByTypeAndPID(qObj);
                List<object> lstObjects = new List<object>();
                foreach (MSObject o in lst)
                {
                    lstObjects.Add(new { text = o.Name, leaf = true, guid = o.Guid, parentguid = o.ParentGuid, citype = o.CiType.ToString() });
                }
                return JsonConvert.SerializeObject(lstObjects);
            }
            else return "";
        }
        public string LoadJsonString(string prjName, string relatePath)
        {
            string httddName = prjName + ".conf";
            string pkgName = prjName + ".pkg.html";
            string appRootFolder = prjName;
            Project project = new Project(prjName);
            project.MsRoot = HttpContext.Current.Server.MapPath("/DirBase/");
            project.AppRootFolder = appRootFolder;
            project.HttpddRootFileName = httddName;
            project.PkgRootFileName = pkgName;

            return JsonConvert.SerializeObject(project.LoadJsonObject(relatePath));
        }
        public void CreateProject(string prjName)
        {
            string httddName = prjName + ".conf";
            string pkgName = prjName + ".pkg.html";
            string appRootFolder = prjName;
            Project project = new Project(prjName);
            project.MsRoot = HttpContext.Current.Server.MapPath("/DirBase/" + prjName);
            project.AppRootFolder = appRootFolder;
            project.HttpddRootFileName = httddName;
            project.PkgRootFileName = pkgName;

            project.SavePkg(Pkg.GetDefaultPkgHtml(prjName, prjName));
            project.SaveHttpdd(Httpdd.GetDefaultHttpddHtml(prjName));

            project.CreateData();
            project.CreateDocs();
            project.CreateEtc();
            project.CreategGraphics();
            project.CreateXMF();
        }
        public string GetPkgHtml(string prjName)
        {
            return Pkg.GetDefaultPkgHtml(prjName, prjName);
        }
        public string GetHttdd(string prjName)
        {
            return Httpdd.GetDefaultHttpddHtml(prjName);
        }

        /// <summary>
        /// 返回json字符串
        /// </summary> 
        public string Insert(string name, string parentguid, CiType icitype,string content)
        {
            var qObj = new MSObject()
            {
                Name = name,
                CiType = icitype,
                ParentGuid = parentguid,
                Flag = Flag.OK,
                Content = content
            };
            this.dao.Insert(qObj);

            List<object> lstObjects = new List<object>();
            {
                lstObjects.Add(new { text = qObj.Name, leaf = true, guid = qObj.Guid, parentguid = qObj.ParentGuid, citype = qObj.CiType.ToString() });
            }
            return JsonConvert.SerializeObject(lstObjects);
        }

        public string GetJsonNode(string guid, IList<CiType> citypes)
        {
            List<object> lstObjects = new List<object>();

            foreach (CiType citype in citypes)
            {
                var qObj = new MSObject() { ParentGuid = guid, CiType = citype };
                var lst = this.dao.QueryByTypeAndPID(qObj); 
                foreach (MSObject o in lst)
                {
                    lstObjects.Add(new { text = o.Name, leaf = true, guid = o.Guid, parentguid = o.ParentGuid, citype = o.CiType.ToString() });
                }
            } 
            return JsonConvert.SerializeObject(lstObjects);
        }
        public string GetJsonNode(string guid, CiType citype)
        {
            var qObj = new MSObject() { ParentGuid = guid, CiType = citype };
            var lst = this.dao.QueryByTypeAndPID(qObj);
            List<object> lstObjects = new List<object>();
            foreach (MSObject o in lst)
            {
                lstObjects.Add(new { text = o.Name, leaf = true, guid = o.Guid, parentguid = o.ParentGuid, citype = o.CiType.ToString() });
            }
            return JsonConvert.SerializeObject(lstObjects);
        }
        public MSObject GetNode(string guid)
        { 
            return this.dao.Query(guid); 
        }
        public void GetJsonLayer(string guid)
        {

        }
        public void GetJsonSymbol(string guid)
        {
            MSObject msObject = this.GetNode(guid);
            Symbol symbol = Utility.XMLUtil.DeserializeXML<Symbol>(msObject.Content);
        }
        public void SaveLayer(string guid, NameValueCollection nvc)
        {
            MSObject msObject = this.GetNode(guid);
            Layer layer = Utility.XMLUtil.DeserializeXML<Layer>(msObject.Content);
            this.dao.Update(msObject);
        }
        public void SaveSymbol(string guid, NameValueCollection nvc)
        {
            MSObject msObject = this.GetNode(guid);
            Symbol symbol = Utility.XMLUtil.DeserializeXML<Symbol>(msObject.Content);
            
        }
        public void SaveClass(string guid, NameValueCollection nvc)
        {
            MSObject msObject = this.GetNode(guid);
            Class msclass = Utility.XMLUtil.DeserializeXML<Class>(msObject.Content);
            msclass.backgroundColor = new rgbColorType() { blue = nvc["blue"]};
        }
    }
}