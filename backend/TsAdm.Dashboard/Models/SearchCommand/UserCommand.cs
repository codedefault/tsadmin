namespace TsAdm.Dashboard.Models.SearchCommand
{
    public class UserCommand :BaseCommand
    {
        public string FieldName { get; set; }
        public string FieldValue { get; set; }
        public string Gender { get; set; }
    }
}