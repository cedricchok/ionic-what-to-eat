import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealdbApiService } from '../services/mealdb-api.service';
import { MEALDB_Meal } from '../model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit {

  mealId: string;
  meal$: Observable<MEALDB_Meal>; // $ est une convention de nommage pour les observables
  ingredientsAndMeasures: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private mealService: MealdbApiService,
    private sanitizer: DomSanitizer
  ) {
    this.mealId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.mealId);

    this.meal$ = this.mealService
      .getMealById(this.mealId)
      .pipe(
        tap((meal) => {
          console.log('ok');
          this.ingredientsAndMeasures = this.getIngredientsAndMeasuresArray(meal);
        })
      );

  }

  getYoutubeLink(meal: MEALDB_Meal): SafeResourceUrl {
    // in: "https://www.youtube.com/watch?v=gfhfsBPt46s"
    // out: "https://www.youtube.com/embed/gfhfsBPt46s"

    const id = meal.strYoutube.split('=')[1]; // gfhfsBPt46s
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + id
    );
  }

  private getIngredientsAndMeasuresArray(meal: MEALDB_Meal): string[] {
    const result: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const value: string =
        meal['strIngredient' + i] + ' ' + meal['strMeasure' + i];
      if (value !== '') {
        result.push(value);
      }
    }
    return result;
  }

  ngOnInit() {
  }

}
