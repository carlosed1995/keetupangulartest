import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  baseURL: string = "http://localhost:8000";
 
public getCombatTypes():Observable<any> {
  return this.http.get<any>(this.baseURL+'/get-combat-types');
}

public getHealthPoints():Observable<any> {
  return this.http.get<any>(this.baseURL+'/get-health-points'); 
}

public getTypePokemons():Observable<any> {
  return this.http.get<any>(this.baseURL+'/get-type-pokemons');
}

public getListPokemons():Observable<any> {
  return this.http.get<any>(this.baseURL+'/get-list-pokemons');
}

public savePokemons(pokemon:Pokemon):Observable<any> {
  return this.http.post<any>(this.baseURL+'/pokemons-save',{pokemon},{headers: {
    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
}})
}

 


}
