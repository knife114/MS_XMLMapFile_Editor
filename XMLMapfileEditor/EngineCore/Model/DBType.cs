using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XMLMapfileEditor.EngineCore.Model
{
    public enum CiType
    {
        AllProjects, Project,
        App,
        Httpdd, HttpddConf,
        Pkg, PkgHtml,
        Layers, LayerXML, LayerInclude, LayerProj,
        Fonts, FontLst,
        Graphics, GraphicImg,
        Etc,
        Symbols, SymbolXML, SymbolFile,
        Map, MapXML, 
        Data 
    }

    public class Flag
    {
       public static readonly int OK = 1;
       public static readonly int Bad = 0;
    }
}