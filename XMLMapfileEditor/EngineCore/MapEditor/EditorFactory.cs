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
    public class EditorFactory : BaseEditor
    {
        #region JsonMap
        public void SaveJsonMap(string guid, string jsonContent)
        {
            Map map = JsonConvert.DeserializeObject<Map>(jsonContent);
            MSObject msObject = base.GetObject(guid);

            //map.include.Add("layer_guid.map");
            
            msObject.Content = Utility.XMLUtil.SerializeXML<Map>(map);
            base.SaveNode(msObject);
        }
        public string GetJsonMap(string guid)
        {
            Map map = base.GetNode<Map>(guid);
           
            return JsonConvert.SerializeObject(map);
        } 
        #endregion

        #region JsonLayer

        public string GetMapJsonLayers(string mguid)
        {
            Map map = base.GetNode<Map>(mguid);
            List<object> lstObjects = new List<object>();
            foreach (var item in map.include)
            {
                if (item.StartsWith("layer_"))
                {
                    string lguid = item.Replace("layer_", "");
                    Layer layer = base.GetNode<Layer>(lguid);
                    //layer.Class[0].status
                    //layer.Class[0].name
                   
                    //layer.Class[0].Style[0].angle
                    //layer.Class[0].Style[0].antialias
                    //layer.Class[0].Style[0].antialiasSpecified
                    //layer.Class[0].Style[0].backgroundColor
                    //layer.Class[0].Style[0].gap
                    //layer.Class[0].Style[0].geomTransform
                    //layer.Class[0].Style[0].geomTransformSpecified
                    //layer.Class[0].Style[0].lineCap
                    //layer.Class[0].Style[0].lineJoin
                    //layer.Class[0].Style[0].lineJoinMaxSize
                    //layer.Class[0].Style[0].lineJoinSpecified
                    //layer.Class[0].Style[0].maxSize
                    //layer.Class[0].Style[0].maxWidth
                    //layer.Class[0].Style[0].offset
                    //layer.Class[0].Style[0].minWidth
                    //layer.Class[0].Style[0].opacity
                    //layer.Class[0].Style[0].pattern
                    //layer.Class[0].Style[0].size
                    //layer.Class[0].Style[0].symbol
                    //layer.Class[0].Style[0].width
                    lstObjects.Add(new { guid = lguid, name = layer.name, status = layer.status, type = layer.type });
                }
            }
           
            return JsonConvert.SerializeObject(lstObjects); ;
        }
        public string GetProjJsonLayers(string pguid)
        {
            var qObj = new MSObject() { ParentGuid = pguid, CiType = CiType.LayerXML };
            var lst = base.dao.QueryByTypeAndPID(qObj);
            List<object> lstObjects = new List<object>();
            foreach (MSObject o in lst)
            {
                Layer layer = Utility.XMLUtil.DeserializeXML<Layer>(o.Content); 
                lstObjects.Add(new {guid=o.Guid, name = layer.name, status = layer.status, type = layer.type });
            } 
             
            return JsonConvert.SerializeObject(lstObjects);
        }
        public string GetJsonLayer(string guid)
        {
            Layer layer = base.GetNode<Layer>(guid);
            return JsonConvert.SerializeObject(layer);
        } 
        public void SaveJsonLayer(string guid, string jsonContent)
        {
            Layer layer = JsonConvert.DeserializeObject<Layer>(jsonContent);
            
            MSObject msObject = base.GetObject(guid); 
            msObject.Content = Utility.XMLUtil.SerializeXML<Layer>(layer);
            base.SaveNode(msObject);
        } 
        #endregion
       
        public string GetJsonSymbol(string guid)
        { 
            Symbol symbol = base.GetNode<Symbol>(guid); 
            
            return JsonConvert.SerializeObject(symbol);
        }

        public string GetJsonStyle(string guid)
        {
            Style obj = base.GetNode<Style>(guid);
             
            return JsonConvert.SerializeObject(obj);
        }
        public string GetJsonLabel(string guid)
        {
            Label obj = base.GetNode<Label>(guid);

            return JsonConvert.SerializeObject(obj);
        }
        public string GetJsonClass(string guid)
        {
            Style obj = base.GetNode<Style>(guid);

            return JsonConvert.SerializeObject(obj);
        }
    }
}