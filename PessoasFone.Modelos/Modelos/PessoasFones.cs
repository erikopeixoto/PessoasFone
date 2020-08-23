using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PessoasFone.Modelos.Modelos
{
    public class PessoasFones
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int FoneNumero { get; set; }
        public int? PessoasId { get; set; }
        public int FoneTipoId { get; set; }
        public Pessoas Pessoas { get; set; }
        public FoneTipo FoneTipo { get; set; }
    }
}
