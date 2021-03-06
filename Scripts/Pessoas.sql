USE [Pessoas]
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Pessoas]') AND type in (N'U'))
DROP TABLE [dbo].[Pessoas]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Pessoas](
	[id] [int] NOT NULL IDENTITY(1,1),
	[nm_pessoa] [varchar](50) NOT NULL,
	[dt_atualizacao] [datetime] NOT NULL DEFAULT GETDATE()
)  
GO

ALTER TABLE dbo.Pessoas ADD CONSTRAINT [ixPessoas01] PRIMARY KEY CLUSTERED
(
Id ASC
)

GO
