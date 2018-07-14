using System.Web.Http;

namespace TsAdm.Dashboard
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }

        protected void Application_PreSendRequestHeaders()
        {
            Response.Headers.Set("Server", "Apache");
        }
    }
}
