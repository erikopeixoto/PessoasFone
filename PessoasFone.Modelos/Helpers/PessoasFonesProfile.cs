using PessoasFone.Modelos.Dtos;
using PessoasFone.Modelos.Modelos;
using AutoMapper;

namespace PessoasFone.Modelos.Helpers
{
    public class PessoasFonesProfile : Profile
    {
        public PessoasFonesProfile()
        {
            CreateMap<PessoasFones, PessoasFonesDto>()
                .ForMember(dest => dest.Descricao, opt => opt.MapFrom(scr => scr.FoneTipo.Descricao))
                .ForMember(dest => dest.Nome, opt => opt.MapFrom(scr => scr.Pessoas.Nome))
                .ForMember(dest => dest.FoneFormatado, opt => opt.MapFrom(scr => scr.FoneNumero.ToString()))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(scr => scr.Id))
                .ForMember(dest => dest.Pessoas, opt => opt.MapFrom(scr => scr.Pessoas))
                .ForMember(dest => dest.PessoasId, opt => opt.MapFrom(scr => scr.PessoasId))
                .ForMember(dest => dest.FoneNumero, opt => opt.MapFrom(scr => scr.FoneNumero))
                .ForAllOtherMembers(dest => dest.Ignore());
        }
    }
}
 