import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms';
import { HttpModule }       from '@angular/http'

import { HeroService }          from './hero.service';
import { HeroDetailComponent }  from './hero-detail.component';
import { HeroesComponent }      from './heroes.component';
import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard.component';

import { AppRoutingModule }     from './app-routing.module';

// Loading and configuring in-memory web API
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service'

@NgModule({
    imports: [ BrowserModule, FormsModule, AppRoutingModule, HttpModule, InMemoryWebApiModule.forRoot(InMemoryDataService) ],
    declarations: [ AppComponent, HeroDetailComponent, HeroesComponent, DashboardComponent],
    providers:    [ HeroService ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
