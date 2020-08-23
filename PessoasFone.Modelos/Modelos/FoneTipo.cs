using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PessoasFone.Modelos.Modelos
{
    public class FoneTipo
    {
        [Key]
        public int Id { get; set; }
        public string Descricao { get; set; }
        public ICollection<PessoasFones> PessoasFones { get; set; }
    }
}
