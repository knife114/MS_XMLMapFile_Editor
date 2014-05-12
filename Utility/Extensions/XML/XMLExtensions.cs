using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;
using System.Xml.Linq;
namespace Utility.Extensions.XML
{
    public static class XMLExtensions
    {
        #region ToAttributeValue
        public static string ToAttributeValue(
            this XElement element, XName elementName, XName attributeName)
        {
            XElement subElement = element.Element(elementName);
            if (subElement != null)
            {
                XAttribute attr = subElement.Attribute(attributeName);
                if (attr != null)
                {
                    return attr.Value;
                }
            }
            return null;
        } 
        #endregion
        #region ToIntAttributeValue
        public static int ToIntAttributeValue(
          this XElement element, XName elementName, XName attributeName)
        {
            try
            {
                XElement subElement = element.Element(elementName);
                if (subElement != null)
                {
                    XAttribute attr = subElement.Attribute(attributeName);
                    if (attr != null)
                    {
                        return int.Parse(attr.Value.Trim());
                    }
                }
            }
            catch { }
            return int.MinValue;
        }
        #endregion
        #region ToDoubleAttributeValue
        public static double ToDoubleAttributeValue(
          this XElement element, XName elementName, XName attributeName)
        {
            try
            {
                XElement subElement = element.Element(elementName);
                if (subElement != null)
                {
                    XAttribute attr = subElement.Attribute(attributeName);
                    if (attr != null)
                    {
                        return double.Parse(attr.Value.Trim());
                    }
                }
            }
            catch { }
            return double.MinValue;
        } 
        #endregion
        #region ToBoolAttributeValue
        public static bool ToBoolAttributeValue(
         this XElement element, XName elementName, XName attributeName)
        {
            try
            {
                XElement subElement = element.Element(elementName);
                if (subElement != null)
                {
                    XAttribute attr = subElement.Attribute(attributeName);
                    if (attr != null)
                    {
                        return bool.Parse(attr.Value.Trim());
                    }
                }
            }
            catch { }
            return true;
        }
        #endregion
        #region ToDateTimeAttributeValue
        public static DateTime ToDateTimeAttributeValue(
           this XElement element, XName elementName, XName attributeName)
        {
            try
            {
                XElement subElement = element.Element(elementName);
                if (subElement != null)
                {
                    XAttribute attr = subElement.Attribute(attributeName);
                    if (attr != null)
                    {
                        return DateTime.Parse(attr.Value.Trim());
                    }
                }
            }
            catch { }
            return DateTime.Now.AddYears(-100);
        } 
        #endregion

        #region ToInnerValue
        public static string ToInnerValue(
         this XElement element, XName elementName)
        {
            XElement subElement = element.Element(elementName);
            if (subElement != null)
            {
                return subElement.Value;
            }
            return null;
        } 
        #endregion
        #region ToIntValue
        public static int ToIntValue(
         this XElement element, XName elementName)
        {
            try
            {
                XElement subElement = element.Element(elementName);
                if (subElement != null)
                {

                    return int.Parse(subElement.Value.Trim());

                }
            }
            catch { }
            return int.MinValue;
        }
        #endregion
        #region ToDoubleValue
        public static double ToDoubleValue(
         this XElement element, XName elementName)
        {
            try
            {
                XElement subElement = element.Element(elementName);
                if (subElement != null)
                {

                    return double.Parse(subElement.Value.Trim());

                }
            }
            catch { }
            return double.MinValue;
        } 
        #endregion
        #region ToDateTimeValue
        public static DateTime ToDateTimeValue(
          this XElement element, XName elementName)
        {
            try
            {
                XElement subElement = element.Element(elementName);
                if (subElement != null)
                {

                    return DateTime.Parse(subElement.Value.Trim());

                }
            }
            catch { }
            return DateTime.Now.AddYears(-100);
        } 
        #endregion

        #region ToBoolValue
        public static bool ToBoolValue(
         this XElement element, XName elementName)
        {
            try
            {
                XElement subElement = element.Element(elementName);
                if (subElement != null)
                {

                    return bool.Parse(subElement.Value.Trim());

                }
            }
            catch { }
            return true;
        }
        #endregion


        #region ToInt
        public static int ToInt(
         this XElement element)
        {
            try
            {

                if (element != null)
                {

                    return int.Parse(element.Value.Trim());

                }
            }
            catch { }
            return int.MinValue;
        }
        #endregion
        #region ToDoubleValue
        public static double ToDouble(
         this XElement element)
        {
            try
            {

                if (element != null)
                {

                    return double.Parse(element.Value.Trim());

                }
            }
            catch { }
            return double.MinValue;
        }
        #endregion
        #region ToDateTimeValue
        public static DateTime ToDateTime(
          this XElement element)
        {
            try
            {

                if (element != null)
                {

                    return DateTime.Parse(element.Value.Trim());

                }
            }
            catch { }
            return DateTime.Now.AddYears(-100);
        }
        #endregion

        #region ToBoolValue
        public static bool ToBool(
         this XElement element)
        {
            try
            {

                if (element != null)
                {

                    return bool.Parse(element.Value.Trim());

                }
            }
            catch { }
            return true;
        }
        #endregion
    }
}
