using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.IO;
using OSGeo.MapServer;
namespace XMLMapfileEditor.test
{
    public partial class MapStream : System.Web.UI.Page
    {
        //private variable for this class
        mapObj map;
        rectObj originalExtent;

        /// 

        /// Zoom Mode Enumerator
        /// 

        private enum ZOOMMODE
        {
            ZoomIn = 0,
            ZoomOut = 1
        }

        ///  
        /// Do a Map Action and send an image stream 
        /// 
        private void Page_Load(object sender, System.EventArgs e)
        {// add some new environment vars
            // TODO check if they may already exist - in which case append to
            //Environment.SetEnvironmentVariable("GDAL_DATA",MY_GDAL_DATA_PATH);
            //Environment.SetEnvironmentVariable("GDAL_DRIVER_PATH",MY_GDAL_DRIVER_PATH);
            Environment.SetEnvironmentVariable("PROJ_LIB", "D:\\ms4w\\proj\\nad");

            // append to existing PATH variable
            //string pathVariable = Environment.GetEnvironmentVariable("PATH";
            //pathVariable += MY_PATH_VARS
            //Environment.SetEnvironmentVariable("PATH",MY_PATH_VARS);
            //read map if existing, otherwhise create a new one from map file
            try
            {
                  string pathVariable = Environment.GetEnvironmentVariable("PATH");
                pathVariable += @";D:\ms4w\Apache\cgi-bin";
                Environment.SetEnvironmentVariable("PATH",pathVariable);
              
                map = (mapObj)Session["MAP"];
                if (map == null)
                {
                    map = new mapObj(System.Configuration.ConfigurationSettings.AppSettings["mapFilePath"].ToString());
                    originalExtent = new rectObj(map.extent.minx, map.extent.miny, map.extent.maxx, map.extent.maxy, 0);
                    Session["ORIGINALEXTENT"] = originalExtent;
                }
                originalExtent = (rectObj)Session["ORIGINALEXTENT"];
                //read x,y
                Double x = 0;
                Double y = 0;
                if (Request.QueryString["X"] != null && Request.QueryString["Y"] != null)
                {
                    x = Double.Parse(Request.QueryString["X"].ToString());
                    y = Double.Parse(Request.QueryString["Y"].ToString());
                }
                //let's see which action is necessary
                String Action = Request.QueryString["ACTION"].ToString().ToUpper();
                switch (Action)
                {
                    case "ZOOMIN":
                        DoZoom(ZOOMMODE.ZoomIn, x, y);
                        break;
                    case "ZOOMOUT":
                        DoZoom(ZOOMMODE.ZoomOut, x, y);
                        break;
                    case "FULLEXTENT":
                        DoZoomFullExtent();
                        break;
                }
                //refresh
                RefreshMap();
                //store in session
                Session["MAP"] = map;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        /// 

        /// Refresh MapServer map and send the image stream to output
        /// 

        private void RefreshMap()
        {
            using (imageObj image = map.draw())
            {
                byte[] img = image.getBytes();
                using (MemoryStream ms = new MemoryStream(img))
                {
                    System.Drawing.Image mapimage = System.Drawing.Image.FromStream(ms);
                    Bitmap bitmap = (Bitmap)mapimage;
                    bitmap.Save(Response.OutputStream, System.Drawing.Imaging.ImageFormat.Jpeg);
                   
                }
            }
        }

        /// 

        /// Do a zoom in or zoom out
        /// 

        /// zoomin or zoomout
        /// x image coordinate
        /// y image coordinate
        private void DoZoom(ZOOMMODE zoomMode, Double x, Double y)
        {
            //Do Zoom In
            if (zoomMode == ZOOMMODE.ZoomIn)
            {
                map.zoomPoint(2, new pointObj(x, y, 0, 0), map.width, map.height, map.extent, null);
            }
            //Do Zoom Out
            if (zoomMode == ZOOMMODE.ZoomOut)
            {
                map.zoomPoint(-2, new pointObj(x, y, 0, 0), map.width, map.height, map.extent, null);
            }
        }

        /// 

        /// Do a Full Extent (return to Origina Extent)
        /// 

        private void DoZoomFullExtent()
        {
            map.extent = originalExtent;
        }

        #region Web Form Designer generated code
        override protected void OnInit(EventArgs e)
        {
            //
            // CODEGEN: This call is required by the ASP.NET Web Form Designer.
            //
            InitializeComponent();
            base.OnInit(e);
        }

        /// 

        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// 

        private void InitializeComponent()
        {
            this.Load += new System.EventHandler(this.Page_Load);

        }
        #endregion
    }
}