import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { PessoasFonesService } from 'src/app/servicos/pessoas-fones.service';
import { FoneTipoService } from 'src/app/servicos/fone-tipo.service';
import { Alerta } from 'src/app/shared/modelos/alerta';
import { MatDialog } from '@angular/material/dialog';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { FoneTipo } from 'src/app/modelos/fone-tipo';
import { PessoasFones } from 'src/app/modelos/pessoas-fones';
import { PessoasFonesDto } from 'src/app/dtos/pessoas-fones-dto';
import { Pessoas } from 'src/app/modelos/pessoas';
import { Util } from 'src/app/utils/util';

@Component({
  selector: 'app-pessoas-fone-detalhe',
  templateUrl: './pessoas-fone-detalhe.component.html',
  styleUrls: ['./pessoas-fone-detalhe.component.css']
})
export class PessoasFoneDetalheComponent implements OnInit {
  @Input() modalParent: any;
  @Input() item: any;
  @Output() itemDestino = new EventEmitter();

  public pessoasFones: PessoasFones;
  public formPessoasFones: FormGroup;
  public operacao: string;
  public tipos: Array<FoneTipo>;

  constructor(
    public pessoasFonesService: PessoasFonesService,
    public foneTipoService: FoneTipoService,
    private router: Router,
    public fb: FormBuilder,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    if (this.pessoasFonesService.pessoasFoneDto) {
      this.operacao = 'Confirma a alteração?';
    } else {
      this.operacao = 'Confirma a inclusão?';
    }

    this.formPessoasFones = this.fb.group({
      FoneTipoId: [null, Validators.required],
      Nome: ['', Validators.required],
      FoneFormatado: ['', [Validators.required, Validators.minLength(8)]],
      FoneNumero: []
    });
    this.foneTipoService.listar().then((lista) => {
      if (lista.length > 0) {
         this.tipos = lista;
      }
    });
  }

  enviar(): void {
    if (this.formPessoasFones.valid) {
      const config = {
        data: {
          titulo: 'Confirmar',
          descricao: this.operacao,
          btnSucesso: 'Ok',
          corBtnSucesso: 'accent',
          possuirBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
           if (Util.isNullOrEmpty(this.pessoasFonesService.pessoasFoneDto)) {
              this.incluirTelefone();
           }
        }
      });
    }
  }

  incluirTelefone(): void {
    const pessoasFonesDto = this.formPessoasFones.getRawValue() as PessoasFonesDto;
    this.pessoasFones = this.formPessoasFones.getRawValue() as PessoasFones;
    this.pessoasFones.foneNumero = Number(pessoasFonesDto.FoneFormatado);
    this.pessoasFones.pessoas = new Pessoas();
    this.pessoasFones.pessoas.nome = pessoasFonesDto.Nome;
    this.pessoasFonesService.incluir(this.pessoasFones).then(() => {
      this.modalParent.modalDetalhePessoasFone.closeModal();
    });
  }

  fechar(): void {
    this.modalParent.modalDetalhePessoasFone.closeModal();
    // this.router.navigateByUrl('pessoasFone');
  }
}
