import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './profissao/cadastro/cadastro.component';
import { ListagemComponent } from './profissao/listagem/listagem.component';


const routes: Routes = [
  { path: '', component: ListagemComponent },
  { path: 'cadastrar', component: CadastroComponent },
  { path: 'editar/:id', component: CadastroComponent },
  { path: 'listagem', component: ListagemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
