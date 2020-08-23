using System;
using System.Collections.Generic;
using System.Linq;
using PessoasFone.Modelos.Modelos;
using PessoasFone.AcessoDados.Contexto;
using System.Threading.Tasks;

namespace PessoasFone.AcessoDados.Repositorios
{
    public class FoneTipoRepositorio: GenericoRepositorio<FoneTipo>
    {
        protected readonly DataContext _contexto;
        public FoneTipoRepositorio(DataContext contexto) : base(contexto)
        {
            _contexto = contexto;
        }
        public bool Existe(long id)
        {
            bool retorno = _contexto.FoneTipos.Any(e => e.Id == id);
            return retorno;
        }
    }
 }
