using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Filters;

namespace TsAdm.Dashboard
{
    public class DxExceptionAttribute :ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            var exception = actionExecutedContext.Exception as ApiException;
            if (exception != null)
            {
                actionExecutedContext.Response = actionExecutedContext.Request.CreateErrorResponse(
                    exception.StatusCode, exception.Message);
            }
            else
            {
                actionExecutedContext.Response =actionExecutedContext.Request.CreateErrorResponse(HttpStatusCode.InternalServerError,
                        new HttpError(actionExecutedContext.Exception.Message));
            }
        }
    }
}