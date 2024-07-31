import type { NutritionFacts } from "../vos/nutrition-facts.vo";

export class FoodDishDetails {
	id: number;

	grams: string;

	ingredients: string;

	nutritionFacts: NutritionFacts;

	instructions: string;

	idFoodDish: number;

	constructor(
		id: number,
		grams: string,
		ingredients: string,
		nutritionFacts: NutritionFacts,
		instructions: string,
		idFoodDish: number,
	) {
		this.id = id;
		this.grams = grams;
		this.ingredients = ingredients;
		this.nutritionFacts = nutritionFacts;
		this.instructions = instructions;
		this.idFoodDish = idFoodDish;
	}
}
