import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {funcionariaRoutes} from "./pages/funcionariar/funcionariar-routing.module";
import {HomeComponent} from "./core/home/home.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children:[...funcionariaRoutes]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
