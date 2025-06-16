import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { InputComponent } from './input/input.component';
import { OutputComponent } from './output/output.component';
import { SettingComponent } from './setting/setting.component';
import { SummaryComponent } from './summary/summary.component';
import { HomeComponent } from './home/home.component';
import { NoFoundComponent } from './no-found/no-found.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.guard';





const routes: Routes = [
  {path:'main',component:MainComponent,canActivate:[AuthGuard],
    children:[
      {path:'home',component:HomeComponent},
      {path:'input',component:InputComponent},
      {path:'output',component:OutputComponent},
      {path:'setting',component:SettingComponent},
      {path:'summary',component:SummaryComponent},
    ]
  },
  {path:'login',component:LoginComponent},
  { path: '', redirectTo: '/main', pathMatch: 'full' }, 
  { path: '**', component: NoFoundComponent } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
