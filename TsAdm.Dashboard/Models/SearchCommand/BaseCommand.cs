namespace TsAdm.Dashboard.Models.SearchCommand
{
    public class BaseCommand
    {
        public BaseCommand()
        {
            Pagination = new Pagination();
            Sort = new Sort();
        }
        public Pagination Pagination { get; set; }
        public Sort Sort { get; set; }
    }
    public class Pagination
    {
        public int TotalPages { get; set; }
        public int Page { get; set; }

        /// <summary>
        /// 当前页
        /// </summary>
        public int CurrentPage { get; set; }
        /// <summary>
        /// 每页大小
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        /// 每页显示
        /// </summary>
        public int[] PageSizes
        {
            get
            {
                return new[] { 5, 10, 15, 20, 25, 50, 100, 200, 300, 400, 500 };
            }
        }
        /// <summary>
        /// 总记录数
        /// </summary>
        public int Total { get; set; }
    }

    public class Sort
    {
        public Sort()
        {
            Order = "ascending";
        }
        public string Prop { get; set; }
        public string Order { get; set; }

        public bool Desc
        {
            get
            {
                return Order.ToLower() == "descending";
            }
        }
    }
}