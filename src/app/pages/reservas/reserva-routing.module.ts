import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormReservaComponent} from "./form-reserva/form-reserva.component";
import {ReservaComponent} from "./reserva-list/reserva.component";
import {HomeReservaComponent} from "./home-reserva/home.reserva.component";
import {FormDetailsComponent} from "../form-details/form-details.component";
import {CardDetailsComponent} from "../card-details/card-details.component";
import {ReservaDetailsComponent} from "./reserva-details/reserva-details.component";
export const reservaRoutes: Routes = [
  {
    path: "reserva",
    component:HomeReservaComponent,
    children: [
      {
        path: "",
        component:ReservaComponent
      },
      {
        path: "novo",
        component: FormReservaComponent
      },
      {
        path: ":codigo",
        component: FormReservaComponent
      },
      ]
  },
  {
    path: 'reservaDetalhes/:id',
    component: ReservaDetailsComponent
  },
];


