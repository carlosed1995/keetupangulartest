import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PokemonComponent } from './pokemon/pokemon.component'; 

const routes:Routes=[
  {path:'dashboard', component:PagesComponent,
  children:[
    {path:'', component:DashboardComponent}, 
    {path:'pokemons', component:PokemonComponent}, 
  ] 
}
]


@NgModule({
 
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class PagesRoutingModule { }
