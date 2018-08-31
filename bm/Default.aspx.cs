using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data; 

namespace RightsManagement
{
    public partial class _Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //Response.Redirect("login.aspx"); 
            //Response.Redirect("~/ycedu/login.html"); 
             Response.Redirect("login.html"); 
        }
         
    }
}