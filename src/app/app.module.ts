import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { DirectivaComponent } from './directiva/directiva.component';
import { HomeComponent } from './home/home.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from "./clientes/cliente.service";
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormComponent } from './clientes/form.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {path: 'home',  component: HomeComponent},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/formulario', component: FormComponent},
  {path: 'clientes/formulario/:id', component: FormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
