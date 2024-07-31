import path from "node:path";
import { match } from "ts-pattern";
import type { FoodDishDetails } from "../../domain/entities/food-dish-details.entity";
import type { FoodDish } from "../../domain/entities/food-dish.entity";

export class FoodDishesService {
	async findFoodDishes(): Promise<FoodDish[]> {
		const pathToFoodDishes = path.resolve(
			__dirname,
			"../../infrastructure/metadata/food-dishes.json",
		);

		const foodDishesFile = Bun.file(pathToFoodDishes, {
			type: "application/json",
		});

		const foodDishes = await foodDishesFile.json();

		return foodDishes;
	}

	async findFoodDishDetailsById(
		id: number,
		plateType: string,
	): Promise<FoodDishDetails & { title: string; image: string }> {
		const foodDishById = await this.findFoodDishById(id, plateType);
		const pathToFoodDishesDetails = path.resolve(
			__dirname,
			"../../infrastructure/metadata/food-dishes-details.json",
		);
		const foodDishesDetailsFile = Bun.file(pathToFoodDishesDetails, {
			type: "application/json",
		});
		const foodDishesDetails = await foodDishesDetailsFile.json();

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
		const pathToFoodDishes = path.resolve(
			__dirname,
			"../../infrastructure/metadata/food-dishes.json",
		);

		const foodDishesFile = Bun.file(pathToFoodDishes, {
			type: "application/json",
		});

		const foodDishes = await foodDishesFile.json();

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
