import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { AppRoutingModule } from './/app-routing.module';
import { CompanyModule } from './company/company.module';
import { ComputerModule } from './computer/computer.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoginCreateComponent } from './login/login-create/login-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationFilterComponent } from './authentication-filter/authentication-filter.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LoginCreateComponent,
    AuthenticationFilterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    AppRoutingModule,
    CompanyModule,
    ComputerModule,
    HttpClientModule,
    RouterModule,
    MatTableModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [AuthenticationFilterComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
