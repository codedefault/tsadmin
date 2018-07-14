using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using TsAdm.Core;

namespace TsAdm.Repository
{
    public interface IRepository<T> where T :class
    {
        IEnumerable<T> FindAll();
        T FindById(int id);
        T Add(T entity);
        bool Update(T entity);
        bool Delete(int id);
        IPagedList<T> FindPagedList(Expression<Func<T, bool>> predicate, string order, bool desc, int pageIndex = 0, int pageSize = 20);
    }
}