import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var $;

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  profissoes = [];
  idProfissão = null; 
  tituloModal = "";

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.apiService.get().subscribe(res => {
      this.profissoes = res;
    });
  }

  buscar(val = "") {
    if (val == "") {
      this.apiService.get().subscribe(res => {
        this.profissoes = res;
      });
    }

    if (val.length < 3) {
      return;
    }

    this.apiService.find(val).subscribe(res => {
      this.profissoes = res.length > 0 ? res : [];
    });
  }

  goToCadastro() {
    this.router.navigate(["/cadastrar"]);
  }

  editar(id) {
    this.router.navigate(["/editar/" + id]);
  }

  abrirModalExcluir(id) {
    this.idProfissão = id;
    $("#modalExcluir").modal("show");
  }

  fecharModalExcluir() {
    this.idProfissão = null;
  }

  excluir() {
    this.apiService.delete(this.idProfissão).subscribe(res => {    
      this.idProfissão = null;
      this.tituloModal = "Profissão excluída com sucesso!";
      $("#modal").modal("show");
      this.buscar();
    });
  }

}
