using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Utility
{
    public  class EnumConvertor
    {
        //enum转换成int:
        public static int Convert2Int(object obj)
        { //(int)AuditState.Init ;
            return (int)obj;
        }
        //enum转换成int:
        public static object ConvertFInt(Type type, int beconvert)
        { //(int)AuditState.Init ;
            return Enum.ToObject(type, beconvert); 
        } 

        //enum转换成string:
        public static string Convert2String(object obj)
        {  //AuditState.Init..ToString();
            return  obj.ToString();
        }
       

        //string转换成enum:
        public static T ConvertFString<T>(string beconvert)
        {   
            //(AuditState)Enum.Parse(typeof(AuditState), beconvert, true);
          
            return (T)Enum.Parse(typeof(T), beconvert, true); 
        }
    }
}
