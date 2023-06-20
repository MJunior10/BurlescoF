import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {funcionariaRoutes} from "./funcionariar-routing.module";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {FuncionariaComponent} from "./funcionaria-list/funcionaria.component";
import {FormFuncionariaComponent} from "./form-funcionaria/form-funcionaria.component";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HomeFuncionariaComponent} from "./home/home.component";
import {CardDetailsComponent} from "./card-details/card-details.component";


@NgModule({
  declarations: [
    HomeFuncionariaComponent,
    FuncionariaComponent,
    FormFuncionariaComponent,

  ],
  imports: [
    CommonModule,
    CommonModule,
    RouterModule.forChild(funcionariaRoutes),
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
    CardDetailsComponent,
  ]
})
export class FuncionariarModule { }
