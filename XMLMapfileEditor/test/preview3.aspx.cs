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
using System.Data.OleDb; //for dbf connection
using System.IO; //for copying the point shapefile

using OSGeo.MapServer;
namespace XMLMapfileEditor.test
{
    public partial class WebForm3 : System.Web.UI.Page
    {
      
        private void Page_Load(object sender, System.EventArgs e)
        {
            //Environment.SetEnvironmentVariable("PROJ_LIB", "D:\\ms4w\\proj\\nad");
            //string pathVariable = Environment.GetEnvironmentVariable("PATH");
            //pathVariable += @";D:\ms4w\Apache\cgi-bin";
            //Environment.SetEnvironmentVariable("PATH", pathVariable);

            if(!Page.IsPostBack) //First access to the map
            {
                //send image stream from MapServer to ibMap
                ibMap.ImageUrl = "MapStream.aspx?ACTION=INITMAP";
                //initialize controls
                //mapObj map = new mapObj(System.Configuration.ConfigurationSettings.AppSettings["mapFilePath"].ToString());
                ////iterate the map layer to populate ddlLayer and cblLayer
                ////for(int i=0;i
                //symbolObj s = new symbolObj("", "");
                //s.filled = 1;
                }
        }
        /// Click Event on the Map button control
        private void ibMap_Click(object sender, System.Web.UI.ImageClickEventArgs e)
        {
            lblInfo.Text = "";
            String Action = "";
            String activeLayer=ddlLayers.SelectedItem.Text;
            //we have to check what GIS tool is needed
            switch(rblGisTools.SelectedItem.Text.ToUpper())
            {
                case "ZOOM IN":
                    Action = "ZOOMIN";
                    break;
                case "ZOOM OUT":
                    Action = "ZOOMOUT";
                    break;
                case "IDENTIFY":
                    Action = "IDENTIFY";
                    break;
                case "ADD POINT":
                    Action = "ADDPOINT";
                    break;
            }
            //For Identify let's call DoIdentify
            if(Action.Equals("IDENTIFY"))
            {
                //DoIdentify(e.X,e.Y,activeLayer);
            }
            //For Add Point let's call AddPoint
            if(Action.Equals("ADDPOINT"))
            {
                String[,] fieldValues = new String[2,2];
                fieldValues[0,0]="POI_USER";
                fieldValues[0,1]=   txtUser.Text;
                fieldValues[1,0]="POI_TIME";
                fieldValues[1,1]= DateTime.Now.ToShortDateString() + ", " + System.DateTime.Now.ToLongTimeString();
                //AddPoint(e.X,e.Y,activeLayer,fieldValues);
            }
            //Stream map image to ibMap according to the needed GIS Action
            ibMap.ImageUrl = "MapStream.aspx?ACTION=" + Action + "&X;=" + e.X + "&Y;=" + e.Y + "&ACTIVELAYER;=" + activeLayer;
        }

        ///  
        /// Create a full Extent Map
        ///  
        private void butFullExtent_Click(object sender, System.EventArgs e)
        {
            ibMap.ImageUrl = "MapStream.aspx?ACTION=FULLEXTENT";
        }

//        private void AddPoint(Double x, Double y, String activeLayer, String[,] fieldValues)
//        {
//            //check: this action is valid only for point shapefiles
//            pointObj point = pixel2point(new pointObj(x,y,0,0)); //conver the image point in map point
//            String shapeFullPath = map.shapepath + "\\" + activeLayer + ".shp";
//            shapefileObj shapefile = new shapefileObj(shapeFullPath,-2);
//            if(shapefile.type!=(int)mapscript.MS_SHAPEFILE_POINT)
//            {
//                //notify action
//                lblInfo.Text = "This action can be performed only on point shapefiles.";
//            }
//            else
//            {
//                /*Alternative way to insert a point in the shapefile using shapeObj:
//                //create line to store the point
//                lineObj line = new lineObj();
//                line.add(point);
//                //create shape
//                shapeObj shape = new shapeObj((int)MS_SHAPE_TYPE.MS_SHAPE_POINT);
//                shape.add(line);
//                //add shape to shapefile
//                shapefile.add(shape);
//                */
//                shapefile.addPoint(point);
//                //add record for dbf table
//                OleDbConnection cn = new OleDbConnection(@"Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + map.shapepath + ";Extended Properties=dBASE IV;User ID=Admin;Password=");
//                cn.Open();
//                OleDbCommand com = cn.CreateCommand();
//                //get field list and value list to use in the query on dbf
//                String fieldList = "";
//                String valueList = "";
//                for(int i=0; i<(fieldValues.Length/2); i++)
//                {
//                    fieldList = fieldList + fieldValues[i,0];
//                    valueList = valueList + "'" + fieldValues[i,1] + "'";
//                    if(i<((fieldValues.Length/2)-1))
//                    {
//                        fieldList = fieldList + ", ";
//                        valueList = valueList + ", ";
//                    }
//                }
//                com.CommandText = "INSERT INTO " + activeLayer + " (" + fieldList + ") VALUES(" + valueList + ")";
//                com.CommandType = CommandType.Text;
//                com.ExecuteNonQuery();
//                cn.Close();
//                //notify action
//                lblInfo.Text = "Point added (" + (shapefile.numshapes + 1) + " features in shapefile).";
//            }
//            shapefile.Dispose();
//        }

//        ///  
//        /// Let's do identify
//        ///  
//        /// x image coordinate for the point to identify
//        /// y image coordinate for the point to identify
//        /// layer to identify
//        private void DoIdentify(Double x, Double y, String activeLayer)
//        {
//            litIdentifyResult.Text = "";
//            //identify
//            layerObj layer = map.getLayerByName(activeLayer);
//            if(layer!=null)
//            {
//                layer.template = "dummy"; //for historical reasons
//                pointObj point = pixel2point(new pointObj(x,y,0,0)); //conver the image point in map point
//                double tolerance = map.width/100; //we use this tolerance
//                if(layer.queryByPoint(map, point, mapscript.MS_SINGLE, tolerance)==(int)MS_RETURN_VALUE.MS_SUCCESS)
//                {
//                    //there is a feature to identify
//                    resultCacheObj result = layer.getResults();
//                    if(result.numresults>0)
//                    {
//                        int shapeInd = result.getResult(0).shapeindex;
//                        //int tileInd = result.getResult(0).tileindex;
//                        layer.open();
//                        shapeObj shape=layer.getFeature(shapeInd, -1);
//                        //iterate fields and getting values
//                        for(int i=0; i
//" + layer.getItem(i) + "=" + shape.getValue(i);
//                        }
//                        layer.close();
//                    }
//                }
//                else
//                {
//                    //there is nothing to identify
//                    System.Diagnostics.Debug.WriteLine("Nothing to identify.");
//                }
//            }
//        }
     
//        /// Conver pixel point coordinates to map point coordinates
//        /// 

//        /// pixel point (from map Image)
//        /// 
//        private pointObj pixel2point(pointObj pointPixel)
//        { 
//            rectObj extent = map.extent;
//            double mapWidth = extent.maxx - extent.minx;
//            double mapHeight = extent.maxy - extent.miny;
//            double xperc;
//            double yperc;
//            xperc = pointPixel.x / map.width;
//            yperc = (map.height-pointPixel.y) / map.height;
//            double x=extent.minx + xperc*mapWidth;
//            double y=extent.miny + yperc*mapHeight;
//            pointObj pointMap = new pointObj(x,y,0,0);
//            return pointMap;
//        }

///// 

//        /// Refresh the map
//        /// 

//        /// 
//        /// 
//        private void butRefresh_Click(object sender, System.EventArgs e)
//        {
//            //iterate layers and check visibility
//            for(int i=0; i

//        /// Restore the original point shapefile (cleared)
//        /// 

//        /// 
//        /// 
//        private void butClear_Click(object sender, System.EventArgs e)
//        {
//            String shapeFullPath = map.shapepath + "\\" + ddlLayers.SelectedItem.Text + ".shp";
//            layerObj layer = map.getLayerByName(ddlLayers.SelectedItem.Text);
//            if(layer.type!=MS_LAYER_TYPE.MS_LAYER_POINT || layer.connectiontype!=MS_CONNECTION_TYPE.MS_SHAPEFILE)
//            {
//                //notify action
//                lblInfo.Text = "This action can be performed only on point shapefiles.";
//            }
//            else
//            {
//                //Clear the point shapefile by copying its copy
//                //Create a DirectoryInfo object representing the specified directory.
//                DirectoryInfo dir = new DirectoryInfo(map.shapepath);
//                //Get the FileInfo objects for every file that belongs to shapefile in the directory.
//                FileInfo[] files = dir.GetFiles(ddlLayers.SelectedItem.Text + "Copy.*");
//                for(int i=0; i

//        /// Required method for Designer support - do not modify
//        /// the contents of this method with the code editor.
//        /// 

//        private void InitializeComponent()
//        {    
//            this.butRefresh.Click += new System.EventHandler(this.butRefresh_Click);
//            this.ibMap.Click += new System.Web.UI.ImageClickEventHandler(this.ibMap_Click);
//            this.butFullExtent.Click += new System.EventHandler(this.butFullExtent_Click);
//            this.butClear.Click += new System.EventHandler(this.butClear_Click);
//            this.Load += new System.EventHandler(this.Page_Load);

//        }
      
    }
}