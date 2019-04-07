import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent} from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { TermsComponent } from './terms/terms.component';
import { CopyrightComponent } from './copyright/copyright.component';
  
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'user', component: UserComponent},
  { path: 'terms', component: TermsComponent},
  { path: 'copyright', component: CopyrightComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
