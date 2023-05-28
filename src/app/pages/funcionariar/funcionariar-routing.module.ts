import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {FormFuncionariaComponent} from "./form-funcionaria/form-funcionaria.component";
import {FuncionariaComponent} from "./funcionaria-list/funcionaria.component";
import {HomeFuncionariaComponent} from "./home/home.component";

export const funcionariaRoutes: Routes = [
  {
    path: "funcionariar",
    component:HomeFuncionariaComponent,
    children: [
      {
        path: "",
        component:FuncionariaComponent
      },
      {
        path: "novo",
        component: FormFuncionariaComponent
      },
      {
        path: ":codigo",
        component: FormFuncionariaComponent
      }
      ]
  }
];


