using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using PessoasFone.WebApi.Enum;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace PessoasFone.WebApi.Controllers.Base
{
    public class MsgResult : IActionResult
    {
        public Task ExecuteResultAsync(ActionContext context)
        {
            throw new System.NotImplementedException();
        }
    }

    public class MessageResultData
    {
        public string Title { get; set; }
        public string Message { get; set; }
        public MessageTypeEnum TypeInt { get; set; }
        public string Type { get { return this.TypeInt.ToString();  } }
    }    

    public static class MessageResult
    {
        public static MessageResultData Message(string title, string message, MessageTypeEnum messageType)
        {
            MessageResultData result = new MessageResultData();
            result.Message = message;
            result.Title = title;
            result.TypeInt = messageType;
            return result;
        }
    }
}

