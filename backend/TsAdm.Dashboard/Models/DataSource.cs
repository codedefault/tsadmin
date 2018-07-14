using System.Collections;
using TsAdm.Core;
using TsAdm.Dashboard.Models.SearchCommand;

namespace TsAdm.Dashboard.Models
{
    public class DataSource<T>
    {
        public DataSource(IPagedList<T> list)
        {
            Pagination = new Pagination
            {
                TotalPages = list.TotalPages,
                Page = list.PageIndex + 1,
                CurrentPage=list.PageIndex+1,
                Total=list.TotalCount,
                PageSize = list.PageSize
            };
        }
        public object ExtraData { get; set; }

        public IEnumerable Data { get; set; }

        public object Errors { get; set; }

        public Pagination Pagination { get; set; }
    }
}