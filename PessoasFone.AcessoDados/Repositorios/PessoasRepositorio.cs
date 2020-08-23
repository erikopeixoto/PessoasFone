using System;
using System.Collections.Generic;
using System.Linq;
using PessoasFone.Modelos.Modelos;
using PessoasFone.AcessoDados.Contexto;
using System.Threading.Tasks;

namespace PessoasFone.AcessoDados.Repositorios
{
    public class PessoasRepositorio: GenericoRepositorio<Pessoas>
    {
        protected readonly DataContext _contexto;
        public PessoasRepositorio(DataContext contexto) : base(contexto)
        {
            _contexto = contexto;
        }
        public bool Existe(long id)
        {
            bool retorno = _contexto.Pessoas.Any(e => e.Id == id);
            return retorno;
        }
    }
 }
