using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PessoasFone.Modelos.Modelos;

namespace PessoasFone.AcessoDados.Map
{
    public class PessoasFonesMap : IEntityTypeConfiguration<PessoasFones>
    {
        public void Configure(EntityTypeBuilder<PessoasFones> builder)
        {
            builder.ToTable("pessoas_fones").HasKey(t => new { t.Id });

            builder.Property(t => t.Id).HasColumnName("id").IsRequired(true);
            builder.Property(t => t.FoneTipoId).HasColumnName("id_fone_tipo").IsRequired(true);
            builder.Property(t => t.PessoasId).HasColumnName("id_pessoas").IsRequired(true);
            builder.Property(t => t.FoneNumero).HasColumnName("num_telefone").IsRequired(true);
            
            builder.HasOne(c => c.FoneTipo)
                   .WithMany(c => c.PessoasFones)
                   .HasForeignKey(c => c.FoneTipoId);
            
            builder.HasOne(c => c.Pessoas)
                   .WithMany(c => c.PessoasFones)
                   .HasForeignKey(c => c.PessoasId);

            // builder.HasData(new PersonPhone { BusinessEntityID = 1, PhoneNumber = "(19)99999-2883", PhoneNumberTypeID = 1 });
            // builder.HasData(new PersonPhone { BusinessEntityID = 1, PhoneNumber = "(19)99999-4021", PhoneNumberTypeID = 2 });
        }
    }
}
