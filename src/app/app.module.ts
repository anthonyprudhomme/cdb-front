import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {CompanyComponent} from './company/company.component';
import {CustomMaterialModule} from './custom-material/custom-material.module';

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    CustomMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
