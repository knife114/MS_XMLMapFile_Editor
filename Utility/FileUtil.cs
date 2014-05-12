using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.IO;
namespace Utility
{
    /// <summary>
    /// 文件工具类
    /// </summary>
    public class FileUtil
    {
        private static string Library = "Library://{FIRST}/{NAME}";
        /// <summary>
        /// 对象序列化为xml后，保存至硬盘
        /// </summary>
        /// <typeparam name="T">T</typeparam>
        /// <param name="obj">待序列化对象</param>
        /// <param name="filePath">保存路径名</param>
        /// <returns>是否成功</returns>
        public static bool Save2Disk<T>(T obj, string filePath)
        {
            bool flag = false;

            try
            { 
                FileInfo fi = new FileInfo(filePath); 
                if (!fi.Directory.Exists)
                {
                    fi.Directory.Create();
                }

                string xml = XMLUtil.SerializeXML<T>(obj);
                File.WriteAllText(filePath, xml);
                return true;
            }
            catch (System.Exception exc)
            {
                throw new System.Exception(exc.Message);
            }
            //return flag;
        }
        /// <summary>
        /// 对象序列化为xml后，保存至硬盘
        /// </summary>
        /// <param name="filePath">保存路径名</param>
        /// <returns>是否成功</returns>
        public static bool Save2Disk(string filePath, string content)
        {
            bool flag = false; 
            try
            {
                FileInfo fi = new FileInfo(filePath);
                if (!fi.Directory.Exists)
                {
                    fi.Directory.Create();
                }
                File.WriteAllText(filePath, content);
                return true;
            }
            catch (System.Exception exc)
            {
                throw new System.Exception(exc.Message);
            }
            //return flag;
        }
        public static string GetStreamContent(Stream stream)
        {
          string result="";
          try
          {
              StreamReader sr = new StreamReader(stream, Encoding.Default);
              result = sr.ReadToEnd(); 
          }
          catch (System.Exception exc)
          {
              throw new System.Exception(exc.Message);
          }
          return result;   
        }
        public static string GetLastFileName2(string filePath)
        {
            FileInfo fi = new FileInfo(filePath);
            string name = fi.Name.Replace(fi.Extension, "");
            return name;
        }
        public static string GetLastFileName(string filePath)
        {
            string key =  GetLastPathName(filePath);
            if (key.LastIndexOf(".") > 0)
            {
                key = key.Substring(0, key.LastIndexOf("."));
            }
          
            return key;
        }
         // Copy directory structure recursively
        public static void CopyDirectory(string Src, string Dst)
        {
            String[] Files;

            if (Dst[Dst.Length - 1] != Path.DirectorySeparatorChar)
                Dst += Path.DirectorySeparatorChar;
            if (!Directory.Exists(Dst)) Directory.CreateDirectory(Dst);
            Files = Directory.GetFileSystemEntries(Src);
            foreach (string Element in Files)
            {
                // Sub directories
                if (Directory.Exists(Element))
                    CopyDirectory(Element, Dst + Path.GetFileName(Element));
                // Files in directory
                else
                    File.Copy(Element, Dst + Path.GetFileName(Element), true);
            }
        }
 
        public static string GetLastPathName(string folder)
        {
            string key = "";
            if (folder.LastIndexOf("/") > 0)
            {
                key = folder.Substring(folder.LastIndexOf("/") + 1);
            }
            else
            {
                key = folder.Substring(folder.LastIndexOf("\\") + 1);
            }
            return key;
        }
        public static string GetDataLibrary(string firstName, string name)
        {
            string result = Library.Replace("{FIRST}", "data").Replace("{NAME}", firstName);
            return result + "/" + name;
        }
        public static string GetDataStoreLibrary(string name)
        {
            return Library.Replace("{FIRST}", "datastores").Replace("{NAME}", name);
        }
        public static string GetLayerLibrary(string name)
        {
            return Library.Replace("{FIRST}", "layers").Replace("{NAME}", name);
        } 
        public static string GetMapLibrary(string name)
        {
            return Library.Replace("{FIRST}", "maps").Replace("{NAME}", name);
        }
        public static string GetStyleLibrary(string name)
        {
            return Library.Replace("{FIRST}", "styles").Replace("{NAME}", name);
        }
    }
}
