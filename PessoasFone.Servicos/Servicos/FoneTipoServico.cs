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

namespace PessoasFone.Servicos.Servicos
{ 
    public class FoneTipoServico : IModeloCRUDInterface<FoneTipo, FoneTipo>
    {
        private readonly FoneTipoRepositorio repositorio;
        public FoneTipoServico(DataContext contexto)
        {
            repositorio = new FoneTipoRepositorio(contexto);
        }

        public async Task<FoneTipo> Incluir(FoneTipo foneTipo)
        {
            return await repositorio.Incluir(foneTipo);
        }
        public async Task<FoneTipo> Alterar(FoneTipo foneTipo)
        {
            return await repositorio.Alterar(foneTipo.Id, foneTipo);
        }
        public async Task<FoneTipo> Excluir(int id)
        {
            return await repositorio.Excluir(id);
        }
        public async Task<List<FoneTipo>> Listar()
        {            
            return await repositorio.Listar();
        }
        public async Task<FoneTipo> BuscarId(int id)
        {
            return await repositorio.BuscarId(id); ;
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
