using System;
using System.Xml;
using System.Linq;
using Utility.Extensions.XML;
using System.Xml.Linq;
 
using System.IO;
using System.Xml.Serialization;
using System.Runtime.Serialization;
//using System.IO;
using System.Text;
namespace Utility
{
    public static class XMLUtil
    {
         

        ///// <summary>
        ///// 对象到XML-----泛类型
        ///// </summary>
        ///// <typeparam name="T"></typeparam>
        ///// <param name="obj"></param>
        ///// <returns></returns>
        //public static string GetXmlFromObj<T>(T obj)
        //{
        //    if (obj == null) return null;
        //    XmlSerializer serializer = new XmlSerializer(typeof(T));
        //    MemoryStream stream = new MemoryStream();
        //    XmlTextWriter xtw = new XmlTextWriter(stream, Encoding.UTF8);
        //    //xtw.Formatting = Formatting.Indented;
        //    try
        //    {
        //        XmlSerializerNamespaces xmlns = new XmlSerializerNamespaces();
        //        xmlns.Add(string.Empty, string.Empty);
        //        serializer.Serialize(stream, obj, xmlns);
        //    }
        //    catch { return null; }
        //    stream.Position = 0;
        //    string returnStr = string.Empty;
        //    using (StreamReader sr = new StreamReader(stream, Encoding.UTF8))
        //    {
        //        string line = "";
        //        while ((line = sr.ReadLine()) != null)
        //        {
        //            returnStr += line + "\n";
        //        }
        //    }
        //    return returnStr;
        //}
        ///// <summary>
        ///// XML到反序列化到对象----支持泛类型
        ///// </summary>
        ///// <typeparam name="T"></typeparam>
        ///// <param name="data"></param>
        ///// <returns></returns>
        //public static T LoadObjFromXML<T>(string data)
        //{
        //    using (MemoryStream stream = new MemoryStream())
        //    {
        //        using (StreamWriter sw = new StreamWriter(stream, Encoding.UTF8))
        //        {
        //            sw.Write(data);
        //            sw.Flush();
        //            stream.Seek(0, SeekOrigin.Begin);
        //            XmlSerializer serializer = new XmlSerializer(typeof(T));
        //            try
        //            {
        //                return ((T)serializer.Deserialize(stream));
        //            }
        //            catch { return default(T); }
        //        }
        //    }
        //}

        /// <summary>
        /// 序列化对象
        /// </summary>
        /// <typeparam name="T">对象类型</typeparam>
        /// <param name="t">对象</param>
        /// <returns></returns>
        public static string SerializeXML<T>(T t)
        {
            using (StringWriter sw = new StringWriter())
            {
                XmlSerializerNamespaces xmlns = new XmlSerializerNamespaces();
                xmlns.Add(string.Empty, string.Empty);
                 
                XmlSerializer xz = new XmlSerializer(t.GetType());
                xz.Serialize(sw, t, xmlns);
                return sw.ToString().Replace("utf-16", "utf-8");
            }
        }

        /// <summary>
        /// 反序列化为对象
        /// </summary>
        /// <param name="type">对象类型</param>
        /// <param name="s">对象序列化后的Xml字符串</param>
        /// <returns>对象</returns>
        public static T DeserializeXML<T>(string s)
        {
            using (StringReader sr = new StringReader(s))
            {
                XmlSerializer xz = new XmlSerializer(typeof(T));
                return (T)xz.Deserialize(sr);
            }
        }

        /// <summary>
        /// 反序列化为对象
        /// </summary>
        /// <typeparam name="T">对象类型</typeparam>
        /// <param name="filepath">xml文件名</param>
        /// <returns>对象</returns>
        public static object DeserializeXML2<T>(string filepath)
        {
            using (Stream sr = File.OpenRead(filepath))
            {
                XmlSerializer xz = new XmlSerializer(typeof(T));
                return xz.Deserialize(sr);
            }
        }
    }
}
