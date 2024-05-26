import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'; 
import { provideRouter } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import {provideHttpClient} from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), provideAnimationsAsync()]
};
