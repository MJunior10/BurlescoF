import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {MatDialog} from "@angular/material/dialog";
import {FuncionariaControllerService} from "../../../api/services/funcionaria-controller.service";
import {FuncionariaDto} from "../../../api/models/funcionaria-dto";
import {ConfirmationDialog, ConfirmationDialogResult} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {min} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-form-funcionaria',
  templateUrl: './form-funcionaria.component.html',
  styleUrls: ['./form-funcionaria.component.scss']
})
export class FormFuncionariaComponent {
  formGroup!: FormGroup;
  public readonly ACAO_INCLUIR = "Incluir";
  public readonly ACAO_EDITAR = "Editar";

  acao : string = this.ACAO_INCLUIR;
  id!: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _adapter: DateAdapter<any>,
    public funcionariaService: FuncionariaControllerService,
    private dialog: MatDialog,
  ) {
    this.createForm();
    this._adapter.setLocale('pt-br');
    this.prepararEdicao();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      apelido: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      supervisor: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      especialidade: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      valorAtendimento: [null, [Validators.required, Validators.min(100)]],
      dataNascimento: [new Date(), Validators.required],

    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      if(!this.id){
        this.realizarInclusao();
      }else{
        this.realizarEdicao();
      }
    }

  }
  private realizarInclusao(){
    if (this.formGroup.valid) {
      console.log("Dados:",this.formGroup.value);
      this.funcionariaService.incluir({body: this.formGroup.value})
        .subscribe( retorno =>{
          console.log("Retorno:",retorno);
          this.confirmarAcao(retorno, this.ACAO_INCLUIR);
          this.router.navigate(["/funcionariar"]);
        }, erro =>{
          console.log("Erro:"+erro);
          alert("Erro ao incluir!");
        })
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };
  confirmarAcao(FuncionariaDto: FuncionariaDto, acao: string) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Mensagem!!!',
        mensagem: `Ação de ${acao} dados: ${FuncionariaDto.nome} (ID: ${FuncionariaDto.id}) realizada com sucesso!`,
        textoBotoes: {
          ok: 'ok',
        },
      },
    });

  }
  showError(acao: string) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: `Erro ao ${acao}`,
        textoBotoes: {
          ok: 'ok',
        },
      },
    });

  }

  private prepararEdicao() {
    const paramId = this.route.snapshot.paramMap.get('codigo');
    if (paramId){
      const codigo = parseInt(paramId);
      console.log("codigo",paramId);
      this.funcionariaService.obterPorId({id: codigo}).subscribe(
        retorno => {
          this.acao = this.ACAO_EDITAR;
          console.log("retorno", retorno);
          this.id = retorno.id;
          this.formGroup.patchValue(retorno);
        }
      )
    }
  }

  private realizarEdicao() {
    console.log("Dados:", this.formGroup.value);
    this.funcionariaService.alterar({id: this.id, body: this.formGroup.value})
      .subscribe(retorno => {
        console.log("Retorno:", retorno);
        this.confirmarAcao(retorno, this.ACAO_EDITAR);
        this.router.navigate(["/funcionariar"]);
      }, erro => {
        console.log("Erro:", erro.error);
        this.showError(this.ACAO_EDITAR);
      })
  }

  protected readonly min = min;
}
