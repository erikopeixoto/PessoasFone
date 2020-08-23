using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PessoasFone.Modelos.Modelos;

namespace PessoasFone.Modelos.Dtos
{
    public class PessoasFonesDto
    {
        public long Id { get; set; }
        public long PessoasId { get; set; }
        public int FoneTipoId { get; set; }
        public int FoneNumero { get; set; }
        public string Nome { get; set; }
        public string FoneFormatado { get; set; }
        public string Descricao { get; set; }
        public Pessoas Pessoas { get; set; }
        public FoneTipo FoneTipo { get; set; }
        //public string FormatarFone()
        //{
        //    string retorno = "";
        //    if (this.FoneNumero > 0)
        //    {
        //        retorno = this.FoneNumero.ToString().PadLeft(9, '0');
        //        retorno = string.Format("{0}.{1}", retorno.Substring(0, 5), retorno.Substring(5, 4));

        //        FoneFormatado = retorno;
        //    }
        //    return retorno;
        //}
    }
}
