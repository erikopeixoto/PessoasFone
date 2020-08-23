using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PessoasFone.Modelos.Modelos;

namespace PessoasFone.AcessoDados.Map
{
    public class PessoasMap : IEntityTypeConfiguration<Pessoas>
    {
        public void Configure(EntityTypeBuilder<Pessoas> builder)
        {
            builder.Ignore(b => b.PessoasFones);

            builder.ToTable("Pessoas", "dbo").HasKey(t => t.Id);

            builder.Property(t => t.Id).HasColumnName("id").IsRequired(true);
            builder.Property(t => t.Nome).HasColumnName("nm_pessoa").IsRequired(true);

            builder.HasMany(t => t.PessoasFones).WithOne(t => t.Pessoas);

            // builder.HasData(new Person { BusinessEntityID = 1, Name = "User One" });
        }
    }
}
