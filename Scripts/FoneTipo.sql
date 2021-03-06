USE [Pessoas]
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fone_tipo]') AND type in (N'U'))
DROP TABLE [dbo].fone_tipo
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[fone_tipo](
	[id] [int] NOT NULL IDENTITY(1,1),
	[ds_fone_tipo] varchar(30) NOT NULL,
	[dt_atualizacao] [datetime] NOT NULL DEFAULT GETDATE()
)  
GO

ALTER TABLE dbo.fone_tipo ADD CONSTRAINT [ixFoneTipo01] PRIMARY KEY CLUSTERED
(
Id ASC
)
create index ixFoneTipo02 on fone_tipo(ds_fone_tipo);
GO


insert into fone_tipo (ds_fone_tipo)
values ('CELULAR');

insert into fone_tipo (ds_fone_tipo)
values ('RESIDENCIAL');

insert into fone_tipo (ds_fone_tipo)
values ('COMERCIAL');
GO