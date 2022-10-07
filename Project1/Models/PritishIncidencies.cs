
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project1.Models
{
    public class PritishIncidencies
    {
#nullable disable
        public int nID { get; set; }
/*        public int nID { get; set; }*/
        public string sTitol { get; set; }
        public string sDescripcio { get; set; }
        public string sEstat { get; set; }
        public string sEmailResponsable { get; set; }
        public DateTime dDataCreacio { get; set; }

        #nullable enable
        public string? sTags { get; set; }
        public string? pImatge { get; set; }


    }
}
