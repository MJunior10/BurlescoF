import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {funcionariaRoutes} from "./pages/funcionariar/funcionariar-routing.module";
import {HomeComponent} from "./core/home/home.component";
import {reservaRoutes} from "./pages/reservas/reserva-routing.module";
import {AutenticacaoRoutes} from "./arquitetura/autenticacao/autenticacao.routing";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children:[...reservaRoutes,...funcionariaRoutes
    ]

  },
  {
    path: "acesso",
    children: [
      ...AutenticacaoRoutes
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
