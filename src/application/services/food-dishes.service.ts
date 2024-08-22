import { match } from "ts-pattern";
import type { FileHelper } from "../../common/helpers/file.helper";
import type { FoodDishDetails } from "../../domain/entities/food-dish-details.entity";
import type { FoodDish } from "../../domain/entities/food-dish.entity";

export class FoodDishesService {
	constructor(private readonly fileHelper: FileHelper) {}

	async findFoodDishes(): Promise<FoodDish[]> {
		const foodDishes = await this.fileHelper.extractFileData<FoodDish[]>(
			"../../infrastructure/data/food-dishes.json",
		);

		return foodDishes;
	}

	async findFoodDishDetailsById(
		id: number,
		plateType: string,
	): Promise<FoodDishDetails & { title: string; image: string }> {
		const foodDishById = await this.findFoodDishById(id, plateType);

		const foodDishesDetails = await this.fileHelper.extractFileData<{
			main: FoodDishDetails[];
			veggies: FoodDishDetails[];
			desserts: FoodDishDetails[];
		}>("../../infrastructure/data/food-dishes-details.json");

		const foodDishesDetailsToMap = match(plateType)
			.with("main", () => {
				return foodDishesDetails.main;
			})
			.with("veggies", () => {
				return foodDishesDetails.veggies;
			})
			.with("desserts", () => {
				return foodDishesDetails.desserts;
			})
			.run();

		const foodDishDetailsById = foodDishesDetailsToMap.find(
			(foodDishDetails: FoodDishDetails) =>
				foodDishDetails.idFoodDish === foodDishById.id,
		);
		if (!foodDishDetailsById) {
			throw new Error("Food dish details not found");
		}

		const foodDishDetailsToReturn = {
			...foodDishDetailsById,
			title: `${foodDishById.title} ${foodDishDetailsById.grams}`,
			image: foodDishById.image,
		};

		return foodDishDetailsToReturn;
	}

	private async findFoodDishById(
		id: number,
		plateType: string,
	): Promise<FoodDish> {
		const foodDishes = await this.fileHelper.extractFileData<{
			main: FoodDish[];
			veggies: FoodDish[];
			desserts: FoodDish[];
		}>("../../infrastructure/data/food-dishes.json");

		const foodDishesDetailsToMap = match(plateType)
			.with("main", () => {
				return foodDishes.main;
			})
			.with("veggies", () => {
				return foodDishes.veggies;
			})
			.with("desserts", () => {
				return foodDishes.desserts;
			})
			.run();

		const foodDishById = foodDishesDetailsToMap.find(
			(foodDish: FoodDish) => foodDish.id === id,
		);
		if (!foodDishById) {
			throw new Error("Food dish not found");
		}

		return foodDishById;
	}
}
