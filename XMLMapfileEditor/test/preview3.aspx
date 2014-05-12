<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="preview3.aspx.cs" Inherits="XMLMapfileEditor.test.WebForm3" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
   <form id="Form1" method="post" runat="server">
            <TABLE id="Table1" cellSpacing="1" cellPadding="1" width="500" border="0">
                <TR>
                    <TD colSpan="3">
                        <P align="center"><STRONG>C# <STRONG>MapServer </STRONG>Tutorial, by Paolo Corti 
                                (26/07/2006)</STRONG></P>
                    </TD>
                </TR>
                <TR>
                    <TD colSpan="3">
                        <P align="center">User:
                            <asp:TextBox id="txtUser" runat="server">Paolo</asp:TextBox></P>
                    </TD>
                </TR>
                <TR>
                    <TD style="HEIGHT: 186px">Layer's visibility (check to make it visible)
                        <asp:checkboxlist id="cblLayers" runat="server"></asp:checkboxlist><asp:button id="butRefresh" runat="server" Text="Refresh Map"></asp:button></TD>
                    <TD style="HEIGHT: 186px"><asp:imagebutton id="ibMap" runat="server" BorderWidth="1px"></asp:imagebutton></TD>
                    <TD style="HEIGHT: 186px">Select a GIS action to perform on the Map:
                        <asp:radiobuttonlist id="rblGisTools" runat="server" Width="93px">
                            <asp:ListItem Value="0" Selected="True">Zoom In</asp:ListItem>
                            <asp:ListItem Value="1">Zoom Out</asp:ListItem>
                            <asp:ListItem Value="2">Identify</asp:ListItem>
                            <asp:ListItem Value="3">Add Point</asp:ListItem>
                        </asp:radiobuttonlist>
                        <asp:button id="butFullExtent" runat="server" Text="Full Extent"></asp:button><br>
                        <asp:Button id="butClear" runat="server" Text="Clear Active Point Layer"></asp:Button></TD>
                </TR>
                <TR>
                    <TD colSpan="3">Select the active layer (to identify):
                        <asp:dropdownlist id="ddlLayers" runat="server"></asp:dropdownlist></TD>
                </TR>
                <TR>
                    <TD colSpan="3"><asp:label id="lblInfo" runat="server" Font-Bold="True" ForeColor="Red"></asp:label></TD>
                </TR>
                <TR>
                    <TD colSpan="3">
                        <asp:Literal id="litIdentifyResult" runat="server"></asp:Literal></TD>
                </TR>
            </TABLE>
        </form>
</body>
</html>
