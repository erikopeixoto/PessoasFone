
namespace PessoasFone.WebApi.Constantes
{
    public static class Constantes
    {

        public const string RegexEmail = @"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$";
        public static bool EnviarEmailMalaDiretaVerdadeira { get { return false; } }
        public const string EmailTeste = "aerico@indracompany.com";

        #region Constantes de Erro
        public const int GcteResume = 1;
        public const int GcteRetry = 2;
        public const int GcteExitProcedure = 3;
        public const int GcteExitApplication = 4;
        #endregion

        #region Mensagens
        public const string ALERTA = "Alerta";
        public const string ERRO = "Erro";
        public const string SUCESSO = "Sucesso";
        public const string INFORMACAO = "Informação";

        public const string MN0001 = "{0} realizad{1} com sucesso.";
        public const string MN0002 = "Informação já cadastrada.";
        public const string MN0003 = "Nenhum registro encontrado.";
        #endregion
    }
}
