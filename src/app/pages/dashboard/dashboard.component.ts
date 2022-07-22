import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { styles } from './mapstyles'; 
import { PokemonService } from 'src/app/services/pokemon.service'; 
import { ViewChild } from '@angular/core'; 
import { Pokemon } from 'src/app/interfaces/pokemon';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'google-maps'; 
  private map: google.maps.Map;
  @ViewChild('map') mapElement: any;

  public lat:any;
  public lng:any;
  public zoom:any;
  public origin:any;
  public destination:any;
  public resultLocation:any;
  listPokemons: any;

  constructor(  
    private pokemonService: PokemonService, 
  ) { }

 

  
  async ngOnInit() {
    this.pokemonService.getListPokemons()
    .subscribe(( listPokemons: Pokemon[]) => {
       this.listPokemons = listPokemons;
    let loader = new Loader({
      apiKey: '###yourapikey###',
    });
 
    loader.load().then(() => {
      console.log('loaded gmaps')
 
      const location = { lat: 10.479931, lng: -66.8201208 }
 
      this.map = new google.maps.Map(document.getElementById("map")!, {
        center: location,
        zoom: 15,
        styles: styles
      })
      console.log(this.listPokemons)
      this.listPokemons.forEach(pokemon => {
        console.log(location)
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(pokemon.latitude, pokemon.longitude),
          map: this.map,
          title: 'Nombre: '+pokemon.name+' Poder: '+ pokemon.power + ' Tipo: '+ pokemon.type
        });
      });
 
     /* const marker = new google.maps.Marker({
        position: location,
        map: this.map,
      });*/
    }) 
  });
  } 

}
