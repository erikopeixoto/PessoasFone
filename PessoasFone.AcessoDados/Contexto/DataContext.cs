using Microsoft.EntityFrameworkCore;
using PessoasFone.Modelos.Modelos;
using PessoasFone.AcessoDados.Map;

namespace PessoasFone.AcessoDados.Contexto
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        public DbSet<Pessoas> Pessoas { get; set; }
        public DbSet<FoneTipo> FoneTipos { get; set; }
        public DbSet<PessoasFones> PessoasFones { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new PessoasMap());
            modelBuilder.ApplyConfiguration(new FoneTipoMap());
            modelBuilder.ApplyConfiguration(new PessoasFonesMap());
            base.OnModelCreating(modelBuilder);
        }
    }
}
 