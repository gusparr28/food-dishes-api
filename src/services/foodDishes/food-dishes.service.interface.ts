import type { FoodDishDetails, FoodDishes } from "./impl/food-dishes.service";

export default interface IFoodDishesService {
	findFoodDishes(): Promise<FoodDishes>;
	findFoodDishDetailsById(id: string): Promise<FoodDishDetails>;
}
