using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using XMLMapfile;
using Newtonsoft.Json;
using XMLMapfileEditor.EngineCore;
using XMLMapfileEditor.EngineCore.DaoService;
using XMLMapfileEditor.EngineCore.Model;

namespace XMLMapfileEditor.EngineCore.MapEditor
{
    public class BaseEditor
    {
        protected MSDaoService dao = new MSDaoService();
        private string guid;

        public string Guid
        {
            get { return guid; }
            set { guid = value; }
        }

        public T GetNode<T>(string guid)
        {
            MSObject msObject = this.dao.Query(guid);
            return Utility.XMLUtil.DeserializeXML<T>(msObject.Content); 
        }
        public MSObject GetObject(string guid)
        {
            MSObject msObject = this.dao.Query(guid);
            return msObject;
        }
        public void SaveNode(MSObject msObject)
        {
            this.dao.Update(msObject); 
        }
    }
}