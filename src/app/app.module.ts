import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
<<<<<<< HEAD
import { HeaderComponent } from './header/header.component';
=======
>>>>>>> 29d9b9fd32445976c1ae6a9296ca470efc3c856f

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
	NgbModule
=======
    NgbModule
>>>>>>> 29d9b9fd32445976c1ae6a9296ca470efc3c856f
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
