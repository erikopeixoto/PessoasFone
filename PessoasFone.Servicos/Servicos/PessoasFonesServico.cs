using PessoasFone.Servicos.Interfaces;
using PessoasFone.Modelos.Modelos;
using PessoasFone.Modelos.Dtos;
using PessoasFone.AcessoDados.Repositorios;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using PessoasFone.AcessoDados.Contexto;
using System.Linq.Expressions;
using AutoMapper;
using System.Linq;

namespace PessoasFone.Servicos.Servicos
{ 
    public class PessoasFonesServico : IModeloCRUDInterface<PessoasFones, PessoasFonesDto>
    {
        private readonly PessoasFonesRepositorio repositorio;
        private readonly IMapper map;
        public PessoasFonesServico(DataContext contexto, IMapper mapper)
        {
            repositorio = new PessoasFonesRepositorio(contexto);
            map = mapper;
        }

        public async Task<PessoasFonesDto> Incluir(PessoasFones pessoasFones)
        {
            PessoasFonesDto pesssoasDto = new PessoasFonesDto();
            pesssoasDto = map.Map<PessoasFonesDto>(await repositorio.Incluir(pessoasFones));

            return pesssoasDto;
        }
        public async Task<PessoasFonesDto> Alterar(PessoasFones pessoasFones)
        {
            return map.Map<PessoasFonesDto>(await repositorio.Alterar(pessoasFones.Id, pessoasFones));
        }
        public async Task<PessoasFonesDto> Excluir(PessoasFones pessoasFones)
        {
            return map.Map<PessoasFonesDto>(await repositorio.Excluir(pessoasFones.Id));
        }
        public async Task<List<PessoasFonesDto>> Listar()
        {
            List<PessoasFones> pessoas = await repositorio.Listar();
            return map.Map<List<PessoasFonesDto>>(pessoas);
        }
        public async Task<PessoasFonesDto> BuscarId(int id)
        {
            PessoasFonesDto pessoa = map.Map<PessoasFonesDto>(await repositorio.BuscarId(id));
            //if (pessoa != null)
            //{
            //    pessoa.FormatarFone();
            //}
            return pessoa;
        }
        public bool Existe(int id)
        {
            return repositorio.Existe(id);
        }
        public void Dispose()
        {
            throw new System.NotImplementedException();
        }
    }
}
