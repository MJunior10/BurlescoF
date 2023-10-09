import {isStandalone, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FuncionariaComponent } from './pages/funcionariar/funcionaria-list/funcionaria.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ConfirmationDialog } from './core/confirmation-dialog/confirmation-dialog.component';
import {FuncionariarModule} from "./pages/funcionariar/funcionariar.module";
import {MatDialogModule} from "@angular/material/dialog";
import {HomeComponent} from "./core/home/home.component";
import {FormDetailsComponent} from "./pages/form-details/form-details.component";
import {MatTableModule} from "@angular/material/table";
import {MatExpansionModule} from "@angular/material/expansion";
import {CardDetailsComponent} from "./pages/card-details/card-details.component";
import {ReservasModule} from "./pages/reservas/reservas.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConfirmationDialog,
    FormDetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FuncionariarModule,
    ReservasModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    MatExpansionModule,
    CardDetailsComponent,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
