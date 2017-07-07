import { Injectable }       from '@angular/core';
import { Headers, Http }    from '@angular/http';

import { Hero } from './hero';
import 'rxjs/add/operator/toPromise'


@Injectable()
export class HeroService {

    // Url to web api
    private heroesUrl = 'api/heroes';
    private headers = new Headers( {'Content-Type': 'application/json'} );

    constructor(private http: Http) {}


    // Asynchronously return (a promise of) an array of all heroes
    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then( response => response.json().data as Hero[] )
            .catch(this.handleError);
    }


    // Asynchronously request an exact Hero match from server itself
    getHero(id: number): Promise<Hero> {

        // The only change is the url; our API supports get-by-id requests
        const url = `${this.heroesUrl}/${id}`;

        return this.http.get(url)
            .toPromise()
            .then( response => response.json().data as Hero )
            .catch(this.handleError);
    }


    // Persist changes to server (return promise to provide completion callback)
    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;

        return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then( () => hero )
            .catch(this.handleError);
    }


    // Create a hero
    create(name: String): Promise<Hero> {
        return this.http.post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then( res => res.json().data as Hero )
            .catch(this.handleError);
    }


    // Delete a hero
    delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;

        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then( () => null )
            .catch(this.handleError);
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
