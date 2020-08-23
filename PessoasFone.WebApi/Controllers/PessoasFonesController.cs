using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PessoasFone.Modelos.Modelos;
using PessoasFone.Modelos.Dtos;
using PessoasFone.AcessoDados.Contexto;
using AutoMapper;
using System.Threading.Tasks;
using PessoasFone.Servicos.Servicos;
using PessoasFone.WebApi.Controllers.Base;
using PessoasFone.WebApi.Enum;
using Microsoft.AspNetCore.Http;

namespace PessoasFone.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasFonesController : ControllerBase
    {
        private readonly PessoasFonesServico servico;
        public PessoasFonesController(DataContext contexto, IMapper mapper)
        {
            servico = new PessoasFonesServico(contexto, mapper);
        }
        [HttpGet, Route("buscar/{id}")]
        public async Task<IActionResult> Buscar(int id)
        {
            try
            {
                PessoasFonesDto pessoas = await servico.BuscarId(id);
                if (pessoas == null)
                {
                    MessageResultData resultado = MessageResult.Message(Constantes.Constantes.ALERTA, "Telefone não encontrado.", MessageTypeEnum.warning);
                    return Ok(resultado);
                }

                return Ok(pessoas);
            }
            catch (Exception ex)
            {
                MessageResultData resultado = MessageResult.Message(Constantes.Constantes.ERRO, $"Banco Dados Falhou {ex.Message}", MessageTypeEnum.danger);
                return BadRequest(resultado);
            }
        }
        [HttpGet, Route("listar")]
        public async Task<IActionResult> Listar()
        {
            try
            {
                List<PessoasFonesDto> pessoas = await servico.Listar();
                if (pessoas.Count == 0)
                {
                    MessageResultData resultado = MessageResult.Message(Constantes.Constantes.ALERTA, "Telefones não encontrados.", MessageTypeEnum.warning);
                    return BadRequest(resultado);
                }
                return Ok(pessoas);
            }
            catch (Exception ex)
            {
                MessageResultData resultado = MessageResult.Message(Constantes.Constantes.ERRO, $"Banco Dados Falhou {ex.Message}", MessageTypeEnum.danger);
                return BadRequest(resultado);
            }

        }
        [HttpPut("{pessoasfone}")]
        public async Task<IActionResult> Alterar(PessoasFones pessoasfone)
        {
            try
            {
                await servico.Alterar(pessoasfone);
                MessageResultData resultado = MessageResult.Message(Constantes.Constantes.SUCESSO, "Alteração realizada com sucesso.", MessageTypeEnum.success);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                MessageResultData resultado = MessageResult.Message(Constantes.Constantes.ERRO, $"Banco Dados Falhou {ex.Message}", MessageTypeEnum.danger);
                return BadRequest(resultado);
            }
        }
        [HttpPost("{pessoasfones}")]
        public async Task<IActionResult> Incluir(PessoasFones pessoasfones)
        {
            try
            {
                PessoasFonesDto aplic = await servico.Incluir(pessoasfones);
                MessageResultData resultado = MessageResult.Message(Constantes.Constantes.SUCESSO, "Inclusão realizada com sucesso.", MessageTypeEnum.success);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                MessageResultData resultado = MessageResult.Message(Constantes.Constantes.ERRO, $"Banco Dados Falhou {ex.Message}", MessageTypeEnum.danger);
                return BadRequest(resultado);
            }
        }
        // DELETE: api/produtos/5
        [HttpDelete("excluir/{id}")]
        public async Task<IActionResult> Excluir(int id)
        {
            try
            {
                await servico.Excluir(id);
                MessageResultData resultado = MessageResult.Message(Constantes.Constantes.SUCESSO, "Exclusão realizada com sucesso.", MessageTypeEnum.success);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                MessageResultData resultado = MessageResult.Message(Constantes.Constantes.ERRO, $"Banco Dados Falhou {ex.Message}", MessageTypeEnum.danger);
                return BadRequest(resultado);
            }
        }
    }
}
