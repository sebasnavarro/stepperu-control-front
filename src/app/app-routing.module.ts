import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ControlesComponent } from './pages/controles/controles.component';
import { ControlComponent } from './pages/control/control.component';


const routes: Routes = [
  { path: 'controles', component: ControlesComponent},
  { path: 'control/:id', component: ControlComponent},
  { path: 'controles/page/:page', component: ControlesComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'controles'}
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
