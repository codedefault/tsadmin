using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Web.Hosting;
using Newtonsoft.Json;
using TsAdm.Core;
using TsAdm.Core.Extensions;
using TsAdm.Domain;

namespace TsAdm.Repository
{
    public class UserRepository : IUserRepository
    {
        private IQueryable<User> _users= JsonConvert.DeserializeObject<List<User>>(File.ReadAllText(HostingEnvironment.MapPath(@"~/Files/Data/grid.txt"))).AsQueryable();
        public IEnumerable<User> FindAll()
        {
            return _users;
        }

        public User FindById(int id)
        {
            return _users.FirstOrDefault(x => x.Id == id);
        }

        public User Add(User entity)
        {
            throw new NotImplementedException();
        }

        public bool Update(User entity)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public IPagedList<User> FindPagedList(Expression<Func<User, bool>> predicate, string order, bool desc, int pageIndex = 0, int pageSize = 20)
        {
            _users = predicate == null ? _users : _users.Where(predicate);
            var totalCount = _users.Count();
            _users = _users.OrderBy(order, desc).Skip(pageIndex * pageSize).Take(pageSize);
            var items = new PagedList<User>(_users, pageIndex, pageSize, totalCount);
            return items;
        }
    }
}
