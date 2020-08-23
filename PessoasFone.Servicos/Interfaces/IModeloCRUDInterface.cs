using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PessoasFone.Servicos.Interfaces
{
    interface IModeloCRUDInterface<T, K> : IDisposable
    {
        Task<K> Incluir(T obj);
        Task<List<K>> Listar();
        Task<K> Alterar(T obj);
        Task<K> Excluir(T obj);
        Task<K> BuscarId(int obj);
        //K Incluir(T obj);
        //List<K> Listar();
        //K Alterar(T obj);
        //K Excluir(T obj);
        //K BuscarId(long id);
        bool Existe(int id);
    }
}
