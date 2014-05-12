using System;
using System.Collections.Generic;
using System.Xml;
using System.Xml.XPath;
using System.Xml.Xsl;
using Mvp.Xml.Common.Xsl;

namespace Utility
{
    public class XlstProc
    {
        public static void Transform(string sXmlPath, string sXslPath, string outfilename)
        {
            try
            {
                //load the Xml doc
                XPathDocument myXPathDoc = new XPathDocument(sXmlPath);
                XslTransform myXslTrans = new XslTransform();

                //load the Xsl 
                myXslTrans.Load(sXslPath);

                //create the output stream
                XmlTextWriter myWriter = new XmlTextWriter(outfilename, null);

                //do the actual transform of Xml
                myXslTrans.Transform(myXPathDoc, null, myWriter);

                myWriter.Close();
            }
            catch (Exception e)
            {
                throw e;
            }

        }


        public static void PrintUsage()
        {
            Console.WriteLine
            ("Usage: XmlTransformUtil.exe <xml path> <xsl path>");
        }

        public static void MvpTransform(string sXmlPath, string sXslPath, string outfilename)
        {
            MvpXslTransform xslt = new MvpXslTransform();
            xslt.Load(sXslPath);
            xslt.Transform(new XmlInput(sXmlPath), null, new XmlOutput(outfilename));
        }
    }
}
