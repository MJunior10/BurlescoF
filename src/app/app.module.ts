import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ConfirmationDialog } from './core/confirmation-dialog/confirmation-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {HomeComponent} from "./core/home/home.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoaderDialogComponent} from "./arquitetura/loader-dialog/loader-dialog.component";
import {LoaderModule} from "./arquitetura/loader/loader.module";
import {SecurityInterceptor} from "./arquitetura/security/security.interceptor";
import {AppInterceptor} from "./arquitetura/app.interceptor";
import {SecurityModule} from "./arquitetura/security/security.module";
import {MatTableModule} from "@angular/material/table";
import {MatExpansionModule} from "@angular/material/expansion";
import {CardDetailsComponent} from "./pages/card-details/card-details.component";
import {FormDetailsComponent} from "./pages/form-details/form-details.component";

import {AutenticacaoModule} from "./arquitetura/autenticacao/autenticacao.module";
import {ReservasModule} from "./pages/reservas/reservas.module";
import {MessageModule} from "./arquitetura/message/message.module";
import {FuncionariarModule} from "./pages/funcionariar/funcionariar.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConfirmationDialog,
    LoaderDialogComponent,
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
        LoaderModule,
        FuncionariarModule,
        ReservasModule,
        MatDialogModule,
        MatSnackBarModule,
        MatTableModule,
        MatExpansionModule,
        CardDetailsComponent,
        MatProgressSpinnerModule,
        AutenticacaoModule,
        MessageModule.forRoot(),
        SecurityModule,//TODO conferir a configuração
        SecurityModule.forRoot({
            nameStorage: 'portalSSOSecurityStorage',
            loginRouter: '/acesso/login'
        }),
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
