namespace TsAdm.Dashboard.Util.TsResponse
{
    /// <summary>
    /// 响应消息实体对象
    /// </summary>
    public class ResponseModel
    {
        public ResponseModel()
        {
            Extra = "";
            Success = true;
            Message = "";
        }
        /// <summary>
        /// 成功与否的标识
        /// </summary>
        public bool Success { get; set; }
        /// <summary>
        /// 消息
        /// </summary>
        public string Message { get; set; }
        /// <summary>
        /// 附加的数据(对象)
        /// </summary>
        public object Extra { get; set; }
    }
}