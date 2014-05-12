using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using XMLMapfile;
using XMLMapfileEditor.EngineCore.Model;

namespace XMLMapfileEditor.EngineCore
{
    public class Project
    {
        private readonly string SampleSource = HttpContext.Current.Server.MapPath("/Web/resources/samplesource");
        private string msRoot = "";

        public string MsRoot
        {
            get { return msRoot; }
            set { msRoot = value; }
        }
        private string projectName = "";

        public string ProjectName
        {
            get { return projectName; }
            set { projectName = value; }
        }
        private string appRootFolder = "";

        public string AppRootFolder
        {
            get
            { 
                return appRootFolder;
            }
            set { 
                appRootFolder = value; }
        }
        private string pkgRootFileName = "";

        public string PkgRootFileName
        {
            get
            {
                if (this.pkgRootFileName == "")
                    this.pkgRootFileName = this.ProjectName;
                return pkgRootFileName;
            }
            set
            {
                if (!value.EndsWith(".pkg.html"))
                {
                    value += ".pkg.html";
                }
                pkgRootFileName = value;
            }
        }
        private string httpddRootFileName = "";

        public string HttpddRootFileName
        {
            get { return httpddRootFileName; }
            set { httpddRootFileName = value; }
        }

        public Project(string projectName)
        {
            this.ProjectName = projectName;
        }


        #region Create
        public void CreateXMF()
        {
            string filepath = Path.Combine(this.MsRoot, "ms4w/apps", this.AppRootFolder,"xmf");
            if (!Directory.Exists(filepath))
                Directory.CreateDirectory(filepath); 
         }
        public void CreateEtc()
        {
            string filepath = Path.Combine(this.MsRoot, "ms4w/apps", this.AppRootFolder);
            filepath = Path.Combine(filepath, "etc");
            if (!Directory.Exists(filepath))
                Directory.CreateDirectory(filepath);

            Utility.FileUtil.CopyDirectory(Path.Combine(this.SampleSource, "etc"), filepath);
        }
        public void CreateDocs()
        {
            string filepath = Path.Combine(this.MsRoot, "ms4w/apps", this.AppRootFolder);
            filepath = Path.Combine(filepath, "docs");
            if (!Directory.Exists(filepath))
                Directory.CreateDirectory(filepath);

            Utility.FileUtil.CopyDirectory(Path.Combine(this.SampleSource, "docs"), filepath);
        }
       
        public void CreateData()
        {
            string filepath = Path.Combine(this.MsRoot, "ms4w/apps", this.AppRootFolder);
            filepath = Path.Combine(filepath, "data");
            if (!Directory.Exists(filepath))
                Directory.CreateDirectory(filepath);

            Utility.FileUtil.CopyDirectory(Path.Combine(this.SampleSource, "data"), filepath);
        }
        public void CreategGraphics()
        {
            string filepath = Path.Combine(this.MsRoot, "ms4w/apps", this.AppRootFolder);
            filepath = Path.Combine(filepath, "graphics");
            if (!Directory.Exists(filepath))
                Directory.CreateDirectory(filepath);

            Utility.FileUtil.CopyDirectory(Path.Combine(this.SampleSource, "graphics"), filepath);
        } 
        #endregion

        public List<object> LoadJsonObject(string relatePath)
        {
            string filepath = Path.Combine(this.MsRoot, relatePath); 

            List<object> lstObjects = new List<object>();
            foreach (string file in Directory.EnumerateFiles(filepath))
            {
                FileInfo fi = new FileInfo(file);
                lstObjects.Add(new { text = fi.Name, leaf = true });
            }
            foreach (string file in Directory.EnumerateDirectories(filepath))
            { 
                FileInfo fi = new FileInfo(file);
                string name = this.ProjectName == "" ? fi.Name + "/ms4w" : fi.Name;
                if (fi.Name.ToLower() == "apache")
                {
                    name = fi.Name + "/htdocs";
                }
                else if (fi.Name.ToLower() == "apps")
                {
                    name = fi.Name + "/"+( new FileInfo( Directory.GetDirectories(fi.FullName)[0])).Name;
                }
                lstObjects.Add(new { text = name, leaf = false });
            }

            return lstObjects;
        }
        
        public Hashtable LoadApps()
        {
            Hashtable ht = new Hashtable();
            string filepath = Path.Combine(this.MsRoot, "ms4w/apps", this.AppRootFolder);
            foreach (string file in Directory.EnumerateFiles(filepath))
            {
                FileInfo fi = new FileInfo(file);
                if (fi.Extension == "xml")
                {
                   Map map = this.LoadApp(fi.Name);
                   if (map == null)
                   {
                       ht.Add(fi.Name, fi.FullName);
                   }
                }
            }

            return ht;
        }
       
        public Map LoadApp(string name)
        {
            try
            {
                string filepath = Path.Combine(this.MsRoot, "ms4w/apps", this.AppRootFolder, name);
                return (Map)Utility.XMLUtil.DeserializeXML2<Map>(filepath);
            }
            catch (Exception)
            {
                return null;
            } 
        }
        public void SaveApp(string name, Map map)
        {
            string filepath = Path.Combine(this.MsRoot, "ms4w/apps", this.AppRootFolder, name);
            Utility.FileUtil.Save2Disk<Map>(map, filepath);
        }

        #region Pkg
        public string LoadPkg()
        {
            string filepath = Path.Combine(this.MsRoot, "ms4w/Apache/htdocs", this.PkgRootFileName);
            return File.ReadAllText(filepath);
        }
        public void SavePkg(String content)
        {
            string filepath = Path.Combine(this.MsRoot, "ms4w/Apache/htdocs", this.PkgRootFileName);
            Utility.FileUtil.Save2Disk(filepath, content);
        } 
        #endregion

        #region Httpdd
        public string LoadHttpdd()
        {
            string filepath = Path.Combine(this.MsRoot, "ms4w/httpd.d", this.HttpddRootFileName);
            return File.ReadAllText(filepath);
        }
        public void SaveHttpdd(String content)
        {
            string filepath = Path.Combine(this.MsRoot, "ms4w/httpd.d", this.HttpddRootFileName);
            Utility.FileUtil.Save2Disk(filepath, content);
        } 
        #endregion
    }
}