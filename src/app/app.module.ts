import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { AppRoutingModule } from './/app-routing.module';
import { CompanyModule } from './company/company.module';
import { ComputerModule } from './computer/computer.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CustomMaterialModule,
    AppRoutingModule,
    CompanyModule,
    ComputerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
