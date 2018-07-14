using System;
using System.Linq;
using System.Threading;
using System.Web.Http;
using TsAdm.Core.Extensions;
using TsAdm.Dashboard.Models;
using TsAdm.Dashboard.Models.SearchCommand;
using TsAdm.Dashboard.Util.TsResponse;
using TsAdm.Domain;
using TsAdm.Repository;

namespace TsAdm.Dashboard.Controllers
{
    public class UserController : ApiController
    {
        private readonly IUserRepository _userRepository = new UserRepository();
        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok(new { UserName = "Admin", EmailAddress = "master@admin.com" });
        }

        [HttpGet]
        public IHttpActionResult Find(int id)
        {
            Thread.Sleep(new Random().Next(500, 1500));
            var model = _userRepository.FindById(id);
            return Ok(new { data = model });
        }

        [HttpPost]
        public IHttpActionResult Grid(UserCommand command)
        {
            Thread.Sleep(new Random().Next(500, 1500));
            var response = TxResponseExtensions.GetTxResponseModel;
            var predicateBuilder = PredicateBuilder.Create<User>(null);
            if (!string.IsNullOrEmpty(command.FieldValue))
            {
                switch (command.FieldName)
                {
                    case "first_name":
                        predicateBuilder = predicateBuilder.And(x => x.first_name.IndexOf(command.FieldValue.ToString(),StringComparison.CurrentCultureIgnoreCase)>=0);
                        break;
                    case "last_name":
                        predicateBuilder = predicateBuilder.And(x => x.last_name.IndexOf(command.FieldValue.ToString(), StringComparison.CurrentCultureIgnoreCase) >= 0);
                        break;
                    case "email":
                        predicateBuilder = predicateBuilder.And(x => x.email.IndexOf(command.FieldValue.ToString(), StringComparison.CurrentCultureIgnoreCase) >= 0);
                        break;
                }
            }
            if (!string.Equals(command.Gender, "All", StringComparison.InvariantCultureIgnoreCase))
            {
                predicateBuilder = predicateBuilder.And(x => x.gender == command.Gender);
            }
            var lst = _userRepository.FindPagedList(predicateBuilder, command.Sort.Prop, command.Sort.Desc, command.Pagination.CurrentPage - 1, command.Pagination.PageSize);
            var grid = new DataSource<User>(lst)
            {
                Data = lst
            };
            return Ok(new { response, grid });
        }
    }
}
