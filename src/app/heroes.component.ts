import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router'
import { Hero }                 from './hero';
import { HeroService }          from './hero.service';

@Component({
    selector: 'my-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: [ './heroes.component.css' ]
})

export class HeroesComponent implements OnInit {
    selectedHero: Hero;
    heroes: Hero[];

    constructor(
        private heroService: HeroService,
        private router: Router
    ) {}

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    getHeroes(): void {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    ngOnInit(): void {
        this.getHeroes();
    }

    gotoDetail(): void {
        this.router.navigate( ['./detail', this.selectedHero.id] );
    }

    // Call the create method with name parameter, handle local changes
    add(name: String): void {
        name = name.trim();
        if (!name) { return; }

        this.heroService.create(name)
            .then( hero => {
                this.heroes.push(hero);
                this.selectedHero = null;
            });
    }

    // Take care of Hero deletion cleanup as it pertains to the heroes component
    delete(hero: Hero): void {
        this.heroService.delete(hero.id)
            .then( () => {
                this.heroes = this.heroes.filter( h => h !== hero);
                if (this.selectedHero === hero) {
                    this.selectedHero = null;
                }
            });
    }
}
