import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoasFoneComponent } from './pessoas-fone/pessoas-fone.component';

const routes: Routes = [
  { path: 'pessoasFone', component: PessoasFoneComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
