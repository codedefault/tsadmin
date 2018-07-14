using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace TsAdm.Core.Extensions
{
    public static class QuerableExtension
    {
        public static IQueryable<TEntity> OrderBy<TEntity>(this IQueryable<TEntity> source, string orderByProperty, bool desc = false)
        {
            var command = desc ? "OrderByDescending" : "OrderBy";
            var type = typeof(TEntity);
            var property = type.GetProperty(orderByProperty, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
            var parameter = Expression.Parameter(type, "p");
            var propertyAccess = Expression.MakeMemberAccess(parameter, property);
            var orderByExpression = Expression.Lambda(propertyAccess, parameter);
            var resultExpression = Expression.Call(typeof(Queryable), command, new Type[] { type, property.PropertyType }, source.Expression, Expression.Quote(orderByExpression));
            return source.Provider.CreateQuery<TEntity>(resultExpression);
        }
    }
}