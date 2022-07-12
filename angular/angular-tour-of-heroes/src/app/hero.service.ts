import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  // Observable is async function as a async-await in node.js
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);// of is a same as await in node.js 
    return heroes;
  }
  
  constructor() { }
}
