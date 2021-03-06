USE [Pessoas]
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[pessoas_fones]') AND type in (N'U'))
DROP TABLE [dbo].[pessoas_fones]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[pessoas_fones](
	[id] [int] NOT NULL IDENTITY(1,1),
	[id_fone_tipo] [int] NOT NULL,
	[id_pessoas] [int] NOT NULL,
	[num_telefone] [int] NOT NULL,
	[dt_atualizacao] [datetime] NOT NULL DEFAULT GETDATE()
)  
GO

ALTER TABLE dbo.pessoas_fones ADD CONSTRAINT [ixPessoasFones01] PRIMARY KEY CLUSTERED
(
Id ASC
)

ALTER TABLE dbo.pessoas_fones ADD CONSTRAINT [fkPesssoasFonesTipo01] FOREIGN KEY (id_fone_tipo) REFERENCES fone_tipo(id);
ALTER TABLE dbo.pessoas_fones ADD CONSTRAINT [fkPessoasFonesPessoas01] FOREIGN KEY (id_pessoas) REFERENCES pessoas(id);

GO
