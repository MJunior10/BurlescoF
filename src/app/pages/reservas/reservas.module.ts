import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {reservaRoutes} from "./reserva-routing.module";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {ReservaComponent} from "./reserva-list/reserva.component";
import {FormReservaComponent} from "./form-reserva/form-reserva.component";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HomeReservaComponent} from "./home-reserva/home.reserva.component";


@NgModule({
  declarations: [
    HomeReservaComponent,
    ReservaComponent,
    FormReservaComponent,

  ],
  imports: [
    CommonModule,
    CommonModule,
    RouterModule.forChild(reservaRoutes),
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ]
})
export class ReservasModule { }
