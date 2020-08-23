using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace PessoasFone.AcessoDados.Repositorios
{
    public abstract class GenericoRepositorio<T> where T : class
    {
        protected readonly DbContext _context;
        protected readonly DbSet<T> dbSet;
        public GenericoRepositorio(DbContext contexto)
        {
            _context = contexto;
            this.dbSet = _context.Set<T>();
        }
        public void Dispose()
        {
            _context.Dispose();
            GC.SuppressFinalize(this);
        }
        // GET: api/Clientes
        public virtual async Task<List<T>> Listar()
        {
            var entity = await dbSet.AsNoTracking<T>().ToListAsync();
            return entity;
        }
        public virtual async Task<T> BuscarId(int id)
        {
            var entity = await dbSet.FindAsync(id);
            return entity;
        }
        public virtual async Task<List<T>> Listar(Expression<Func<T, bool>> where)
        {
            var entity = await dbSet.AsNoTracking<T>().Where<T>(where).ToListAsync<T>();
            return entity;
        }
        public virtual async Task<T> Alterar(long id, T entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new ArgumentException(TrataErro(ex));
            }
            return entity;
        }
        public virtual async Task<T> Incluir(T entity)
        {
            try
            {
                entity = _context.Set<T>().Add(entity).Entity;
                await _context.SaveChangesAsync();
                return entity;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(TrataErro(ex));
            }

        }
        public virtual async Task<T> Excluir(long id)
        {
            var entity = _context.Set<T>().Find(id);

            _context.Set<T>().Remove(entity);
            await _context.SaveChangesAsync();

            return entity;
        }
        private string TrataErro(Exception ex)
        {
            string msg = "";
            var sqlError = ex.InnerException.InnerException;

            if (sqlError == null)
            {
                msg = ex.InnerException.Message;
            }
            else
            {
                msg = sqlError.Message;
            }
            int LcolFim = msg.IndexOf((char)13);

            if (LcolFim != -1)
            {
                msg = msg.Substring(0, LcolFim);
            }
            return msg;
        }
    }
}
