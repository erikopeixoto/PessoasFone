import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './modulos/material/material.module';
import { TopoComponent } from './shared/components/topo/topo.component';
import { RodapeComponent } from './shared/components/rodape/rodape.component';
import { AlertaComponent } from './shared/components/alerta/alerta.component';
import { PessoasFoneComponent } from './pessoas-fone/pessoas-fone.component';
import { CamposModule } from './shared/components/campos/campos.module';
import { ModalComponent } from './shared/modal/modal.component';
import { NgxbootstrapModule } from './modulos/ngxbootstrap/ngxbootstrap.module';
import { PessoasFoneDetalheComponent } from './pessoas-fone/pessoas-fone-detalhe/pessoas-fone-detalhe.component';
import { ProgressSpinnerComponent } from './shared/progress-spinner/progress-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    RodapeComponent,
    AlertaComponent,
    PessoasFoneComponent,
    ModalComponent,
    PessoasFoneDetalheComponent,
    ProgressSpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    LayoutModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxbootstrapModule,
    CamposModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt' }],
  bootstrap: [AppComponent],
  exports: [ProgressSpinnerComponent]
})
export class AppModule { }
