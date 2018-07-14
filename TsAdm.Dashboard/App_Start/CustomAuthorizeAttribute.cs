using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace TsAdm.Dashboard
{
    public class CustomAuthorizeAttribute : AuthorizeAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            var principal = actionContext.RequestContext.Principal as ClaimsPrincipal;

            if (principal != null && !principal.Identity.IsAuthenticated)
            {
                actionContext.Response = new HttpResponseMessage (HttpStatusCode.Forbidden);
                return;
            }

            //var userName = principal.FindFirst(ClaimTypes.Name).Value;
            //var newCustomClaim = principal.FindFirst("newCustomClaim").Value;
            //var roles = Roles;

            base.OnAuthorization(actionContext);
        }

    }
}