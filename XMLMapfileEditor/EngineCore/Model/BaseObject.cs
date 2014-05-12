using System;
using System.Collections.Generic;
using System.Text;

namespace XMLMapfileEditor.EngineCore.Model
{
    public class BaseObject
    {
        private string guid;

        public string Guid
        {
            get { return guid; }
            set { guid = value; }
        }

        private string parentGuid;

        public string ParentGuid
        {
            get { return parentGuid; }
            set { parentGuid = value; }
        }
    }
}