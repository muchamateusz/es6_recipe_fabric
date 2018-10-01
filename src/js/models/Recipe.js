import axios from "axios";
import { key, proxy } from "../config";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }
  async getRecipe() {
    try {
      const result = await axios(
        `${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`
      );
      this.title = result.data.recipe.title;
      this.publisher = result.data.recipe.publisher;
      this.author = result.data.recipe.author;
      this.img = result.data.recipe.image_url;
      this.url = result.data.recipe.source_url;
      this.ingredients = result.data.recipe.ingredients;
    } catch (error) {
      alert("error :", error);
    }
  }

  calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = [
      "tablespoons",
      "tablespoon",
      "ounces",
      "ounce",
      "teaspoons",
      "teaspoon",
      "cups",
      "pounds"
    ];
    const unitsShort = [
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "tsp",
      "cup",
      "pound"
    ];

    const newIngredient = this.ingredients.map(el => {
      // uniform units0
      let ingredient = el.toLowerCase();

      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\)/g, " ");

      // parse ingredients into count unit and ingredient
      const arrIng = ingredient.split(" ");
      const unitIndex = arrIng.findIntex(el2 => units.includes(el2));
      let objIng;
      if (unitIndex > -1) {
        const arrCount = arrIng.slice(0, unitIndex);
        if (arrCount.length === 1) {
            count = arrIng[0].replace('-', '+');
        } else {
            count = eval.arrIng.slice(0, unitIndex).join('+');
        }

        objIng = {
            count,
            unit: arrIng[unitIndex],
            ingredient: arrIng.slice(1).join()
        }


      } else if (parseInt(arrIng[0], 10)) {
          objIng = {
              count: parseInt(arrIng[0], 10),
              unit:'',
              ingredient: arrIng.slice(1).join(' ')
          }
      } else if (unitIndex === -1) {
        objIng = {
            count: 1,
            unit: '',
            ingredient
        }
      }
      console.log('objIng :', objIng);
      return objIng;
    });
    this.ingredients = newIngredient;
  }
}
