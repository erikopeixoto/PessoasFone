import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PessoasFones } from '../modelos/pessoas-fones';
import { PessoasFonesDto } from '../dtos/pessoas-fones-dto';
import { ModalComponent } from '../shared/modal/modal.component';
import { PessoasFonesService } from '../servicos/pessoas-fones.service';
import { Util } from '../utils/util';
import { Alerta } from 'src/app/shared/modelos/alerta';
import { MatDialog } from '@angular/material/dialog';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';

@Component({
  selector: 'app-pessoas-fone',
  templateUrl: './pessoas-fone.component.html',
  styleUrls: ['./pessoas-fone.component.css']
})
export class PessoasFoneComponent implements OnInit {

  @ViewChild('modalDetalhePessoasFone', {static: true} ) modalDetalhePessoasFone: ModalComponent;

  get getVisiblePessoasFoneDetalhe(): boolean {
    return this.modalDetalhePessoasFone.getVisible();
  }

  public PessoasFone: PessoasFonesDto;
  public parente: PessoasFoneComponent;
  public stsPessoasFones = false;
  public filtro = '';
  public pessoasFones: PessoasFones;
  public pessoasFonesFiltrados: PessoasFonesDto [];
  public filtroLista: PessoasFones;
  public filtroListagem: FormGroup;

  constructor(
    public pessoasFonesService: PessoasFonesService,
    public fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.parente = this;
  }

  ngOnInit(): void {
    this.pessoasFones = new PessoasFones();
    this.filtroListagem = this.fb.group({
      nome: ['']
    });
    this.pesquisarPessoasFones();
  }

  pesquisarPessoasFones(): void {
    this.pessoasFonesService.listar().then((lista) => {
    if (!Util.isNullOrEmpty(lista[0].FoneNumero)) {
       this.pessoasFonesFiltrados = lista;
     }
    });
  }

  receberPessoasFone(itemRecebido): void {

  }

  openModal(template: any): void {
    template.show();
  }

  editarPessoasFone(item: PessoasFonesService): void {

  }

  excluirPessoasFone(item: PessoasFonesDto): void {
    const config = {
      data: {
        titulo: 'Confirmar',
        descricao: 'Confirma a exclusão?',
        btnSucesso: 'Ok',
        corBtnSucesso: 'accent',
        possuirBtnFechar: true
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
         if (! Util.isNullOrEmpty(item)) {
            this.pessoasFones.id = item.Id;
            this.pessoasFonesService.excluir(this.pessoasFones).then(() => {
            });
         }
      }
    });
  }

  incluirPessoasFone(): void {
    this.pessoasFonesService.pessoasFoneDto = null;
    this.modalDetalhePessoasFone.title = 'Inclusão';
    this.modalDetalhePessoasFone.showModal();
  }
}
