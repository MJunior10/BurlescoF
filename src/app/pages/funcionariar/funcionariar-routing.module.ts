import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormFuncionariaComponent} from "./form-funcionaria/form-funcionaria.component";
import {FuncionariaComponent} from "./funcionaria-list/funcionaria.component";
import {HomeFuncionariaComponent} from "./home/home.component";
import {FormDetailsComponent} from "../form-details/form-details.component";
import {CardDetailsComponent} from "../card-details/card-details.component";
import {SecurityGuard} from "../../arquitetura/security/security.guard";
export const funcionariaRoutes: Routes = [
  {
    path: "funcionariar",
    component:HomeFuncionariaComponent,
    children: [
      {
        path: "",
        component:FuncionariaComponent,
      },
      {
        path: "novo",
        component: FormFuncionariaComponent,
        canActivate: [SecurityGuard],
        data: {security: {roles: ['ROLE_ADMIN']}}
      },
      {
        path: ":codigo",
        component: FormFuncionariaComponent
      },
      ]
  },
  {
    path: "detalhes",
    component: FormDetailsComponent
  },
  {
    path: 'cardDetalhes/:id',
    component: CardDetailsComponent
  },
];


