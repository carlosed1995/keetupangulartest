import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PokemonComponent } from './pokemon/pokemon.component'; 
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { GoogleMapsModule } from '@angular/google-maps';





@NgModule({
  declarations: [
    DashboardComponent,
    PokemonComponent, 
    PagesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule
  ],
  exports: [
    DashboardComponent,
    PokemonComponent, 
  ]
})
export class PagesModule { }
