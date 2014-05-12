using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace XMLMapfileEditor.EngineCore.Model
{
    public class ExtjsTree
    {
        private string id = Guid.NewGuid().ToString();
        [JsonProperty("id")]
        public string Id
        {
            get { return id; }
            set { id = value; }
        }
        private string text;

        [ JsonProperty("text",Required=Required.Default)]
        public string Text
        {
            get { return text; }
            set { text = value; }
        }

        private bool leaf = false;
        [JsonProperty("leaf")]
        public bool Leaf
        {
            get { return leaf; }
            set { leaf = value; }
        }
        private bool expanded = false;
        [JsonProperty("expanded")]
        public bool Expanded
        {
            get { return expanded; }
            set { expanded = value; }
        }
        private List<ExtjsTree> children;
        [JsonProperty("children" )]
        public List<ExtjsTree> Children
        {
            get { return children; }
            set { children = value; }
        }
 
        public String toJson()
        {
            string json = JsonConvert.SerializeObject(this);
            return json;
        }
    }
}