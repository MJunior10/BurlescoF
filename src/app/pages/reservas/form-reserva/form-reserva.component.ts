import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialog, ConfirmationDialogResult} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {min} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ReservaControllerService} from "../../../api/services/reserva-controller.service";
import {ReservaDto} from "../../../api/models/reserva-dto";
import {FuncionariaDto} from "../../../api/models/funcionaria-dto";
import {FuncionariaControllerService} from "../../../api/services/funcionaria-controller.service";

@Component({
  selector: 'app-form-reserva',
  templateUrl: './form-reserva.component.html',
  styleUrls: ['./form-reserva.component.scss']
})
export class FormReservaComponent {
  formGroup!: FormGroup;
  public readonly ACAO_INCLUIR = "Incluir";
  public readonly ACAO_EDITAR = "Editar";


  acao : string = this.ACAO_INCLUIR;
  id!: number;

  funcionarias: FuncionariaDto[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _adapter: DateAdapter<any>,
    public reservaControllerService: ReservaControllerService,
    private dialog: MatDialog,
    private funcionariaService: FuncionariaControllerService
  ) {
    this.createForm();
    this._adapter.setLocale('pt-br');
    this.prepararEdicao();
    this.carregarDados();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      nomeCliente: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      funcionaria_id: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      dataReserva: [new Date(), Validators.required],

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
      this.reservaControllerService.incluir({body: this.formGroup.value})
        .subscribe( retorno =>{
          console.log("Retorno:",retorno);
          this.confirmarAcao(retorno, this.ACAO_INCLUIR);
          retorno.dataReserva = `${retorno.dataReserva}T03:00:00.000Z`;
          this.router.navigate(["/reserva"]);
        }, erro =>{
          console.log("Erro:"+erro);
          alert("Erro ao incluir!");
        })
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };
  confirmarAcao(reservaDto: ReservaDto, acao: string) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Mensagem!!!',
        mensagem: `Ação de ${acao} dados: ${reservaDto.nomeCliente} (ID: ${reservaDto.id}) realizada com sucesso!`,
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
      this.reservaControllerService.obterPorId({id: codigo}).subscribe(
        retorno => {
          this.acao = this.ACAO_EDITAR;
          console.log("retorno", retorno);
          this.id = retorno.id;
          retorno.dataReserva = `${retorno.dataReserva}T03:00:00.000Z`;
          this.formGroup.patchValue(retorno);
        }
      )
    }
  }

  private realizarEdicao() {
    console.log("Dados:", this.formGroup.value);
    this.reservaControllerService.alterar({id: this.id, body: this.formGroup.value})
      .subscribe(retorno => {
        console.log("Retorno:", retorno);
        this.confirmarAcao(retorno, this.ACAO_EDITAR);
        this.router.navigate(["/reserva"]);
      }, erro => {
        console.log("Erro:", erro.error);
        this.showError(this.ACAO_EDITAR);
      })
  }
  private carregarDados() {
    this.funcionariaService.listAll1().subscribe(value => {
      this.funcionarias = value;
    })
  }


  protected readonly min = min;
}
