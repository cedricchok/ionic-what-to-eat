import { Component } from '@angular/core';
import {MealdbApiService} from '../services/mealdb-api.service';
import {MEALDB_Category, MEALDB_ListItem} from '../model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  meals: MEALDB_ListItem[] | null = null;
  // Get all categories from enum MEALDB_Category
  categories = Object.keys(MEALDB_Category);
  selectedCategory: string;

  constructor(private mealDbApi: MealdbApiService) {
    this.loadData();
    console.log(this.categories);
  }

  loadData() {
    if (this.selectedCategory) {
      this.mealDbApi.getMealsByCategory(this.selectedCategory)
        .subscribe(data => {
          this.meals = data;
          console.log(this.meals);
        });
    }
  }

}
