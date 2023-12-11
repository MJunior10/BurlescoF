import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";

import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {ReservaControllerService} from "../../../api/services/reserva-controller.service";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {ReservaDto} from "../../../api/models/reserva-dto";
@Component({
  selector: 'app-card-details',
  templateUrl: './reserva-details.component.html',
  styleUrls: ['./reserva-details.component.scss'],
  standalone: true,
  imports: [MatExpansionModule, RouterLink, MatTableModule, MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, NgIf, ReactiveFormsModule, MatCardModule, MatIconModule, RouterOutlet],
})
export class ReservaDetailsComponent {
  formGroup!: FormGroup;

  id!: number;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _adapter: DateAdapter<any>,
    public reservaService: ReservaControllerService,
    private dialog: MatDialog,
  ) {
    this.createForm();
    this._adapter.setLocale('pt-br');
    this.obterDados();

  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      funcionaria_nome: [{value: null, disabled: true}, Validators.required],
      funcionaria_apelido: [{value: null, disabled: true}, Validators.required],
      funcionaria_supervisor: [{value: null, disabled: true}, Validators.required],
      dataReserva: [{value: new Date(), disabled: true}, Validators.required],
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dadosColetados();
    }
  }

  private obterDados() {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId){
      const codigo = parseInt(paramId);
      console.log("codigo",paramId);
      this.reservaService.obterPorId({id: codigo}).subscribe(
        retorno => {
          console.log("retorno", retorno);
          this.id = retorno.id;
          retorno.dataReserva = `${retorno.dataReserva}T03:00:00.000Z`;
          this.formGroup.patchValue(retorno);
        }
      )

    }
  }
  private dadosColetados() {
    console.log("Dados:", this.formGroup.value);
    this.reservaService.obterPorId({id: this.id})
      .subscribe(retorno => {
        console.log("Retorno:", retorno);
        this.router.navigate(["/reservaDetalhes"]);
      })
  }



  // private dataReserva() {
  //   console.log("Dados:", this.formGroup.value);
  //   this.reservaService.pesquisar({body: this.reservaDTO})
  //     .subscribe(retorno => {
  //       console.log("Retorno:", retorno);
  //       this.router.navigate(["/reservaDetalhes"]);
  //     })
  // }



}
