import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {FuncionariaControllerService} from "../../api/services/funcionaria-controller.service";

import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialog} from "../../core/confirmation-dialog/confirmation-dialog.component";
@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
  standalone: true,
  imports: [MatExpansionModule, RouterLink, MatTableModule, MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, NgIf, ReactiveFormsModule],
})
export class CardDetailsComponent{
  formGroup!: FormGroup;

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
    this.obterDados();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      nome: [{value: null, disabled: true}, Validators.required],
      apelido: [{value: null, disabled: true}, Validators.required],
      supervisor: [{value: null, disabled: true}, Validators.required],
      especialidade: [{value: null, disabled: true}, Validators.required],
      valorAtendimento: [{value: null, disabled: true}, Validators.required],
      dataNascimento: [{value: new Date(), disabled: true}, Validators.required],

    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
        this.dadosColetados();
      }
  }

  private obterDados() {
    const paramId = this.route.snapshot.paramMap.get('codigo');
    if (paramId){
      const codigo = parseInt(paramId);
      console.log("codigo",paramId);
      this.funcionariaService.obterPorId({id: codigo}).subscribe(
        retorno => {
          console.log("retorno", retorno);
          this.id = retorno.id;
          this.formGroup.patchValue(retorno);
        }
      )

    }
  }

  private dadosColetados() {
    console.log("Dados:", this.formGroup.value);
    this.funcionariaService.alterar({id: this.id, body: this.formGroup.value})
      .subscribe(retorno => {
        console.log("Retorno:", retorno);
        this.router.navigate(["/cardDetalhes"]);
      })
  }
}
