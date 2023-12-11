import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FuncionariaDto} from "../../api/models/funcionaria-dto";
import {FuncionariaControllerService} from "../../api/services/funcionaria-controller.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmationDialog} from "../../core/confirmation-dialog/confirmation-dialog.component";
import {CardDetailsComponent} from "../card-details/card-details.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.scss']
})
export class FormDetailsComponent implements OnInit  {

  formGroup!: FormGroup;
  colunasMostrar = ['nome', 'apelido', 'acao','reservar'];
  funcionariaListaDataSource : MatTableDataSource<FuncionariaDto> = new MatTableDataSource<FuncionariaDto>([]);
  constructor(
    private formBuilder: FormBuilder,
    public funcionariaService: FuncionariaControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    });
  }
  ngOnInit(): void {
    this.buscarDados();
  }
   buscarDados() {
    this.funcionariaService.listAll1().subscribe(data => {
      console.log(data);
      this.funcionariaListaDataSource.data = data;
    })
  }
  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };
  pesquisar(){
    if (this.formGroup.valid) {
      console.log("Dados:",this.formGroup.value);
      this.funcionariaService.pesquisar1({body: this.formGroup.value})
        .subscribe( retorno =>{
          console.log("Retorno:",retorno);
          this.funcionariaListaDataSource.data = retorno;
        }, erro =>{
          console.log("Erro:"+erro);
          alert("Erro ao Pesquisar!");
        })
    }
  }
}
