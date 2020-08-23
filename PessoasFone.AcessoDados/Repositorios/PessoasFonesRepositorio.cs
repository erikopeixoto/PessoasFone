using System;
using System.Collections.Generic;
using System.Linq;
using PessoasFone.Modelos.Modelos;
using PessoasFone.AcessoDados.Contexto;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PessoasFone.AcessoDados.Repositorios
{
    public class PessoasFonesRepositorio: GenericoRepositorio<PessoasFones>
    {
        protected readonly DbSet<PessoasFones> dbSetPessoas;
        protected readonly DataContext _contexto;
        public PessoasFonesRepositorio(DataContext contexto) : base(contexto)
        {
            _contexto = contexto;
            this.dbSetPessoas = _context.Set<PessoasFones>();
        }
        public override async Task<List<PessoasFones>> Listar()
        {
            var entity = await dbSetPessoas.AsNoTracking<PessoasFones>()
                .ToListAsync();
            foreach(var item in entity)
            {
                item.Pessoas = _contexto.Pessoas.FirstOrDefault(a => a.Id == item.PessoasId);
                item.FoneTipo = _contexto.FoneTipos.FirstOrDefault(a => a.Id == item.FoneTipoId);
            }
            return entity;

        }
        public override async Task<PessoasFones> BuscarId(int id)
        {
            var entity = await dbSetPessoas.AsNoTracking<PessoasFones>()
                .Include(a => a.Pessoas)
                .Include(a => a.FoneTipo)
                .FirstOrDefaultAsync(a => a.Id == id);
            return entity;
        }
        public bool Existe(int id)
        {
            bool retorno = _contexto.PessoasFones.Any(e => e.Id == id);
            return retorno;
        }
    }
 }
