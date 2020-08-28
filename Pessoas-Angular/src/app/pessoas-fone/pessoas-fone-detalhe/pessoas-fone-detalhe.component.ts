import { Router } from '@angular/router';
import { Component,
         OnInit, Input, Output, EventEmitter ,   ChangeDetectionStrategy, ViewChild, resolveForwardRef,
} from '@angular/core';
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
import { MaskManager } from '../../utils/mask-manager';
import { InputTextComponent } from 'src/app/shared/components/campos/input-text/input-text.component';

@Component({
  selector: 'app-pessoas-fone-detalhe',
  templateUrl: './pessoas-fone-detalhe.component.html',
  styleUrls: ['./pessoas-fone-detalhe.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PessoasFoneDetalheComponent implements OnInit {
  @Input() modalParent: any;
  @Input() item: any;
  @Output() itemDestino = new EventEmitter();

  @ViewChild('InputTexto', {static: true}) inputTexto: InputTextComponent;

  public pessoasFones: PessoasFones;
  public pessoasFonesDto: PessoasFonesDto;
  public formPessoasFones: FormGroup;
  public operacao: string;
  public tipos: Array<FoneTipo>;
  public maskManager: MaskManager;
  public pai: PessoasFoneDetalheComponent;
  public cargaDados: boolean;

  constructor(
    public pessoasFonesService: PessoasFonesService,
    public foneTipoService: FoneTipoService,
    private router: Router,
    public fb: FormBuilder,
    public dialog: MatDialog,
  ) {
      this.pai = this;
  }

  ngOnInit(): void {
    this.foneTipoService.listar().then((lista) => {
      if (! Util.isNullOrEmpty(lista) && lista.length > 0) {
         this.tipos = lista;
      }
    });
    this.cargaDados = true;

    this.formPessoasFones = this.fb.group({
      foneTipoId: [null, Validators.required],
      nome: ['', Validators.required],
      foneFormatado: ['', [Validators.required, Validators.minLength(8)]],
      foneNumero: [],
      pessoasId: []
    });

    if (this.pessoasFonesService.pessoasFoneDto) {
      this.operacao = 'Confirma a alteração?';
      this.pessoasFonesDto = this.pessoasFonesService.pessoasFoneDto;
      this.telefoneExistente();
      this.cargaDados = false;
    } else {
      this.operacao = 'Confirma a inclusão?';
    }
  }

  async telefoneExistente(): Promise<boolean> {
    await this.carregarDados();
    return true;
  }

  carregarDados(): Promise<boolean> {
    return new Promise((resolve) => {
    this.formPessoasFones.controls['foneTipoId'].setValue(this.pessoasFonesDto.foneTipoId);
    this.formPessoasFones.controls['nome'].setValue(this.pessoasFonesDto.nome);
    this.formPessoasFones.controls['foneFormatado'].setValue(this.pessoasFonesDto.foneNumero);
    resolve(true);
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
           if (Util.isNullOrEmpty(this.pessoasFonesDto)) {
              this.incluirTelefone();
           } else {
            this.alterarTelefone();
          }
        }
      });
    }
  }

  incluirTelefone(): void {
    const pessoasDto = this.formPessoasFones.getRawValue() as PessoasFonesDto;
    this.pessoasFones = this.formPessoasFones.getRawValue() as PessoasFones;
    this.pessoasFones.foneNumero = Number(pessoasDto.foneFormatado);
    this.pessoasFones.pessoas = new Pessoas();
    this.pessoasFones.pessoas.nome = pessoasDto.nome;
    this.pessoasFonesService.incluir(this.pessoasFones).then(() => {
      this.modalParent.pesquisarPessoasFones();
      this.modalParent.modalDetalhePessoasFone.closeModal();
    });
  }

  alterarTelefone(): void {
    const pessoasDto = this.formPessoasFones.getRawValue() as PessoasFonesDto;
    this.pessoasFones = this.formPessoasFones.getRawValue() as PessoasFones;
    this.pessoasFones.foneNumero = Number(pessoasDto.foneFormatado);
    this.pessoasFones.pessoas = new Pessoas();
    this.pessoasFones.pessoas.nome = pessoasDto.nome;
    this.pessoasFones.foneTipoId = pessoasDto.foneTipoId;
    this.pessoasFones.pessoas.id = this.pessoasFonesDto.pessoasId;
    this.pessoasFones.pessoasId = this.pessoasFonesDto.pessoasId;
    this.pessoasFones.id = this.pessoasFonesDto.id;
    this.pessoasFonesService.alterar(this.pessoasFones).then(() => {
      this.modalParent.pesquisarPessoasFones();
      this.modalParent.modalDetalhePessoasFone.closeModal();
    });
  }

  fechar(): void {
    this.modalParent.modalDetalhePessoasFone.closeModal();
  }

  alterarMascaraTelefone(): void {
    let retorno = '0000-0000';
    const foneTipo = this.formPessoasFones.controls['foneTipoId'].value;
    const foneTipoIdDto = this.pessoasFonesDto ? this.pessoasFonesDto.foneTipoId : 0;
    if (foneTipo === 1 && this.inputTexto.maskTexto === '0000-0000') {
      retorno = '0 0000-0000';
      if (foneTipo !== foneTipoIdDto){
        this.formPessoasFones.controls['foneFormatado'].setValue('');
      }
      this.formPessoasFones.controls['foneFormatado'].setValidators(Validators.compose([
      Validators.required, Validators.minLength(9)]));
      this.inputTexto.maskTexto = retorno;
      this.inputTexto.update();
    } else if (foneTipo !== 1) {
      this.formPessoasFones.controls['foneFormatado'].setValidators(Validators.compose([
        Validators.required, Validators.minLength(8)]));
      this.inputTexto.maskTexto = retorno;
      this.inputTexto.update();
    }
    this.cargaDados = true;
  }

  ativarTelefone(): boolean {
    let retorno = true;
    if (! Util.isNullOrEmpty(this.formPessoasFones.controls['foneTipoId'].value)) {
      retorno = false;
    }
    return retorno;
  }
}
