using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using XMLMapfile;
using System.IO;

namespace XMLMapfileEditor.test
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string file = "c:\\x\\x\\aa.txt\\a";
            Directory.CreateDirectory(file);
            FileInfo fi = new FileInfo(file);
            
            fi.Create();

            String filepath = Server.MapPath("/xmlmapfile/tests") + "";
            string layersetpath = filepath + "\\layerset.xml";
            string mapfilepath = filepath + "\\mapfile-test.xml";
            string symbolsetpath = filepath + "\\symbolset.xml";

            Map map = new Map();
            Map map1 = Utility.XMLUtil.DeserializeXML2<Map>(mapfilepath) as Map;

            LayerSet LayerSet1 = Utility.XMLUtil.DeserializeXML2<LayerSet>(layersetpath) as LayerSet;
            SymbolSet SymbolSet1 = Utility.XMLUtil.DeserializeXML2<SymbolSet>(symbolsetpath) as SymbolSet;
            
        }
    }
}