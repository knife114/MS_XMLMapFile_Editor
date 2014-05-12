using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
namespace XMLMapfileEditor.EngineCore.Model
{
    public class MSObject : BaseObject
    {
        private string name;

        public string Name
        {
            get { return name; }
            set { name = value; }
        }
        private string content;

        public string Content
        {
            get { return content; }
            set { content = value; }
        }
        private string folderPath;

        public string FolderPath
        {
            get { return folderPath; }
            set { folderPath = value; }
        }
        private CiType ciType;

        [JsonConverter(typeof(StringEnumConverter))]
        public CiType CiType
        {
            get { return ciType; }
            set { ciType = value; }
        }
        private DateTime createdTime = DateTime.Now ;

        public DateTime CreatedTime
        {
            get { return createdTime; }
            set { createdTime = value; }
        }
        private DateTime lastModifiedTime = DateTime.Now;

        public DateTime LastModifiedTime
        {
            get { return lastModifiedTime; }
            set { lastModifiedTime = value; }
        }
        private int flag;

        public int Flag
        {
            get { return flag; }
            set { flag = value; }
        }
        private string tag;

        public string Tag
        {
            get { return tag; }
            set { tag = value; }
        }
 
    }
}