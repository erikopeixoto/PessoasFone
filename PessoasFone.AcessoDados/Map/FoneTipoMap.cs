using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PessoasFone.Modelos.Modelos;

namespace PessoasFone.AcessoDados.Map
{
    public class FoneTipoMap : IEntityTypeConfiguration<FoneTipo>
    {
        public void Configure(EntityTypeBuilder<FoneTipo> builder)
        {
            builder.Ignore(b => b.PessoasFones);

            builder.ToTable("fone_tipo", "dbo").HasKey(t => t.Id);

            builder.Property(t => t.Id).HasColumnName("id").IsRequired(true);
            builder.Property(t => t.Descricao).HasColumnName("ds_fone_tipo").IsRequired(true);

            // builder.HasData(new PhoneNumberType { PhoneNumberTypeID = 1, Name = "Local phone"  });
            // builder.HasData(new PhoneNumberType { PhoneNumberTypeID = 2, Name = "Cellphone" });

        }
    }
}
