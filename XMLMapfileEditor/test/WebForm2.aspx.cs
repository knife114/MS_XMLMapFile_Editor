using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using XMLMapfileEditor.EngineCore.DaoService;
using XMLMapfileEditor.EngineCore.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using XMLMapfile;

namespace XMLMapfileEditor.test
{
    public partial class WebForm2 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                JContainer o = (JContainer)JsonConvert.DeserializeObject("{a:'1',b:'2'}");
                Newtonsoft.Json.Linq.JObject jJsonObj = Newtonsoft.Json.Linq.JObject.Parse("{a:'1',b:'2'}");

                string root = Server.MapPath("/");
                string xml = root + "/EngineCore/Scheme/xmlmapfile/tests/mapfile-test.xml";
                string xls = root + "/EngineCore/Scheme/xmlmapfile/mapfile.xsl";
                Utility.XlstProc.MvpTransform(xml, xls, root + "/DirBase/xx.map");

                string result1 = JsonConvert.SerializeObject(new Symbol());

                string result = JsonConvert.SerializeObject(new Layer());

                result = JsonConvert.SerializeObject(new XMLMapfile.Style()); 

                MSDaoService dao = new MSDaoService();
                MSObject obj = dao.Query("");
            }
            catch (Exception ex)
            {

                throw;
            }


        }
    }
}