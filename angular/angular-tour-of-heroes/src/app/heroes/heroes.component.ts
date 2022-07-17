import { Component, OnInit } from '@angular/core';

import { HEROES } from '../mock-heroes';

import {Hero} from '../hero';
import { HeroService } from '../hero.service'
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes', //matches the name of the HTML element in parent component's template app-component.html
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
// Always export the component class so you can import it elsewhere,  like in the AppModule.
export class HeroesComponent implements OnInit {

  heroVadim: Hero = {
    id: 777,
    name: 'Vadim'
  }
  
  heroes2 = HEROES;
  
  heroes: Hero[] = [];

  
  
  selectedHero?: Hero;

  // this method we use in component.html <button> element
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    //this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  getHeroes(): void {
    // lambda func is a same as anonymyos func. 
    // The subscribe() method passes the array to the callback, 
    // which sets the component's heroes property.
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes); 
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  constructor(private heroService: HeroService, private messageService: MessageService) {

   }
  //lifecycle hook. It's a good place to put initialization logic.
  ngOnInit(): void {
    this.getHeroes();
  }

}
