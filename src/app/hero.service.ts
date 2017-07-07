import { Injectable }       from '@angular/core';
import { Headers, Http }    from '@angular/http';

import { Hero } from './hero';
import 'rxjs/add/operator/toPromise'


@Injectable()
export class HeroService {

    // Url to web api
    private heroesUrl = 'api/heroes';

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


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
