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
    public class FoneTipoController : ControllerBase
    {
        private readonly FoneTipoServico servico;
        public FoneTipoController(DataContext contexto, IMapper mapper)
        {
            servico = new FoneTipoServico(contexto);
        }
        [HttpGet, Route("buscar/{id}")]
        public async Task<IActionResult> Buscar(int id)
        {
            try
            {
                FoneTipo pessoas = await servico.BuscarId(id);
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
                List<FoneTipo> pessoas = await servico.Listar();
                if (pessoas.Count == 0)
                {
                    MessageResultData resultado = MessageResult.Message(Constantes.Constantes.ALERTA, "Telefones não encontrados.", MessageTypeEnum.warning);
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
    }
}
