import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormReservaComponent} from "./form-reserva/form-reserva.component";
import {ReservaComponent} from "./reserva-list/reserva.component";
import {HomeReservaComponent} from "./home-reserva/home.reserva.component";
import {FormDetailsComponent} from "../form-details/form-details.component";
import {CardDetailsComponent} from "../card-details/card-details.component";
import {ReservaDetailsComponent} from "./reserva-details/reserva-details.component";
import {SecurityGuard} from "../../arquitetura/security/security.guard";
export const reservaRoutes: Routes = [
  {
    path: "reserva",
    component:HomeReservaComponent,
    children: [
      {
        path: "",
        component:ReservaComponent,
      },
      {
        path: "novo",
        component: FormReservaComponent,
        canActivate: [SecurityGuard],
        data: {security: {roles: ['ROLE_ADMIN']}}
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


