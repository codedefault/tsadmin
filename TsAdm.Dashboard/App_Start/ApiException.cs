using System;
using System.Net;

namespace TsAdm.Dashboard
{
    public class ApiException : Exception
    {
        public ApiException(HttpStatusCode statusCode, string message, Exception ex)
            : base(message, ex)
        {
            StatusCode = statusCode;
        }

        public ApiException(HttpStatusCode statusCode, string message)
            : base(message)
        {
            StatusCode = statusCode;
        }

        public ApiException(HttpStatusCode statusCode)
        {
            StatusCode = statusCode;
        }

        public HttpStatusCode StatusCode { get; }
    }
}