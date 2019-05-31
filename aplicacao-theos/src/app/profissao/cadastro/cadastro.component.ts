import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var $;

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formProfissao: FormGroup;
  sexos = [
    { id: 1, value: 'Masculino' },
    { id: 2, value: 'Feminino' }
  ];
  cidades = [];
  estados = [];
  profissoes = [];
  isEdit = false;
  titulo = 'Cadastrar Profissão';
  tituloModal = 'Cadastro realizado com sucesso!';
  salvando = false;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router) {

    this.init();

  }

  init() {
    this.formProfissao = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      sexo: ['', Validators.required],
      data: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      areaFormacao: ['', Validators.required],
      profissao: ['', Validators.required]
    }); 

    this.activatedRoute.params.subscribe(
      params => {
        if (!params['id']) {
          this.titulo = 'Cadastrar Profissão';
          this.carregarProfissoesEstados();
          return;
        }

        this.titulo = 'Editar Profissão';

        this.apiService.getById(params['id']).subscribe(
          (res: any) => {
            if (res && res._id) {
              this.carregarCampos(res);
            } else {
              this.titulo = 'Cadastrar Profissão';
            }
            this.carregarProfissoesEstados();
          },
          err => {

          }
        );
      },
      err => {

      }
    );
  }

  carregarCampos(res) {
    this.isEdit = true;
    this.formProfissao.get("id").setValue(res._id);
    this.formProfissao.get("nome").setValue(res.nome);
    this.formProfissao.get("sobrenome").setValue(res.sobrenome);
    this.formProfissao.get("email").setValue(res.email);
    this.formProfissao.get("sexo").setValue(res.sexo);
    this.formProfissao.get("data").setValue(res.data);
    this.formProfissao.get("cidade").setValue(res.cidade);
    this.formProfissao.get("estado").setValue(res.estado);
    this.formProfissao.get("areaFormacao").setValue(res.areaFormacao);
    this.formProfissao.get("profissao").setValue(res.profissao);
  }

  carregarProfissoesEstados() {
    this.apiService.getProfissoes().subscribe(res => {
      this.profissoes = res.profissoes;
    });

    this.apiService.getEstadosCidades().subscribe(res => {
      this.estados = res.estados;
      var estado = this.formProfissao.get("estado").value;
      this.formProfissao.get('estado').setValue(estado != null && estado != "" ? estado : this.estados[0].nome);
      this.carregarCidades(this.formProfissao.get("estado").value);
    });
  }

  carregarCidades(estado) {
    this.cidades = this.estados.find(e => e.nome == estado).cidades;
    var cidade = this.formProfissao.get("cidade").value;
    this.formProfissao.get('cidade').setValue(cidade != null && cidade != "" && this.cidades.find(c => c == cidade) ? cidade : this.cidades[0]);
  }

  salvar() {
    this.salvando = true;
    if (this.formProfissao.invalid) {
      return;
    }
    this.salvando = false;

    if (!this.isEdit) {
      this.apiService.create(this.formProfissao.value).subscribe(res => {
        this.tituloModal = "Profissão cadastrada com sucesso!";
        this.init();
        $("#modal").modal("show");
      }, err => {
      });
    } else {
      this.apiService.update(this.formProfissao.value).subscribe(res => {
        this.tituloModal = "Profissão editada com sucesso!";
        $("#modal").modal("show");
      }, err => {
      });
    }
  }

  goToListagem() {
    this.router.navigate(["/listagem"]);
  }

  get getformProfissao(): any {
    return this.formProfissao.controls;
  }

  ngOnInit() {
  }

}
