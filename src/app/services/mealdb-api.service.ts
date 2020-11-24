import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {MEALDB_ListItem, MEALDB_Meal} from '../model';

const MEALDB_API = {
  ROOT: 'https://www.themealdb.com/api/json/v1/1/',
  // Getter pour pouvoir accéder à son return
  get FILTER() { // Obtenir une lliste de repas par category
    return this.ROOT + 'filter.php?c=';
  },
  get LOOKUP() { // obtenir les infos détaillées d'un repas (identifié)
    return this.ROOT + 'lookup.php?i=';
  }
};

@Injectable({
  providedIn: 'root'
})
export class MealdbApiService {

  constructor(private http: HttpClient) { }

  getMealsByCategory(category: string): Observable<MEALDB_ListItem[]> {
    // return this.http.get<any>(MEALDB_API.ROOT + 'filter.php?c=' + category);
    return this.http
      .get(MEALDB_API.FILTER + category)
      .pipe(
        map((res: any) => res.meals)
      );
  }

  getMealById(id: string): Observable<MEALDB_Meal> {
    return this.http
      .get<MEALDB_Meal>(MEALDB_API.LOOKUP + id)
      .pipe(
        map((res: any) => res.meals[0]) // retourne un objet de type MEALDB_Meal
      );
  }
}
