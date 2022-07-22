import { Component, OnInit } from '@angular/core'; 
import { FormControl, FormGroup, Validators, FormBuilder   } from '@angular/forms';
import { PokemonService } from 'src/app/services/pokemon.service'; 
import { RandomCoordinateUtils } from '@molteni/coordinate-utils';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
 
  public submit:boolean=false;
  public sendFormData:boolean=false;
  form: FormGroup;
  files:any;
 

  combatTypes: any = [];
  healthPoints: any = [];
  typePokemon: any = [];
  
  public lat:any;
  public lng:any;
  public zoom:any;
  public origin:any;
  public destination:any;
  public resultLocation:any;

  constructor(private formBuilder: FormBuilder, 
      private pokemonService: PokemonService,
      private route: Router
    ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      power: new FormControl('', Validators.required),
      type_pokemon_id: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      height: new FormControl('', Validators.required),
      health_point_id: new FormControl('', Validators.required),
      attack: new FormControl('', Validators.required),
      defending: new FormControl('', Validators.required),
      latitude: new FormControl(''),
      longitude: new FormControl('')
    });
    

  }

  getUserLocation() {
    // get Users current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 16;
        const alternativeResult = RandomCoordinateUtils.randomCoordinateFromPositionWithExplicitLatLng(this.lat, this.lng, 0.2)
        this.resultLocation = alternativeResult;
        console.log("alternativeResult", alternativeResult)
        console.log("position", position)
      });
    }else{
      console.log("User not allowed")
    }
  }

  getCombatTypes(){
    this.pokemonService.getCombatTypes().subscribe(
      (resp:any) => { 
        this.combatTypes = resp;  
        
      },
      (error) => {
        console.log(error);
      }
    ); 
  }

  getHealthPoints(){
    this.pokemonService.getHealthPoints().subscribe(
      (resp:any) => { 
        this.healthPoints = resp;
        console.log(this.healthPoints);  
      },
      (error) => {
        console.log(error); 
      }
    ); 
  }

  getTypePokemons(){
    this.pokemonService.getTypePokemons().subscribe(
      (resp:any) => { 
        this.typePokemon = resp; 
        console.log(this.typePokemon); 
      },
      (error) => {
        console.log(error);
      }
    ); 
  }

  ngOnInit(): void {
    this.getCombatTypes();
    this.getHealthPoints();
    this.getTypePokemons();
    this.getUserLocation();
  }

  sendForm() {
    const isValid = this.form.valid; 
    this.form.value.latitude = this.resultLocation.latitude;
    this.form.value.longitude = this.resultLocation.longitude;
    this.submit = true;
    console.log(this.form.value)
    console.log(isValid)
    console.log(this.submit)
    if (isValid)
    {
       this.sendFormData = true;
       this.pokemonService.savePokemons(this.form.value).subscribe((response: any) => {
        this.route.navigate(['/dashboard'])
      });
    }
  }

 

}
