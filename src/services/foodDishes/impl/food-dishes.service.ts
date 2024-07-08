import type IFoodDishesService from "../food-dishes.service.interface";

export type FoodDishes = {
	id: string;
	image: string;
	title: string;
}[];

export type FoodDishesDetails = FoodDishDetails[];

export type FoodDishDetails = {
	foodDishDetailsId: string;
	ingredients: string;
	nutritionalInformation: string;
	useMode: string;
	foodDishesId: string;
};

const foodDishes: FoodDishes = [
	{
		id: "1",
		image: "image",
		title: "Ternera guisada con setas y estragón",
	},
	{
		id: "2",
		image: "image",
		title: "Ternera guisada con setas y estragón",
	},
	{
		id: "3",
		image: "image",
		title: "Ternera guisada con setas y estragón",
	},
];

const foodDishesDetails: FoodDishesDetails = [
	{
		foodDishDetailsId: "1",
		ingredients: "pimenton y cebolla",
		nutritionalInformation: "100 kilocalorias",
		useMode: "aplicar al pedo",
		foodDishesId: "1",
	},
	{
		foodDishDetailsId: "2",
		ingredients: "tomate y perejil",
		nutritionalInformation: "200 kilocalorias",
		useMode: "aplicar a los coñazos",
		foodDishesId: "2",
	},
	{
		foodDishDetailsId: "3",
		ingredients: "atun y pimienta",
		nutritionalInformation: "3000 kilocalorias",
		useMode: "no aplicar",
		foodDishesId: "3",
	},
];

export default class FoodDishesService implements IFoodDishesService {
	findFoodDishes(): Promise<FoodDishes> {
		return new Promise((resolve) => {
			resolve(foodDishes);
		});
	}

	findFoodDishDetailsById(id: string): Promise<FoodDishDetails> {
		const foodDishById = foodDishes.find((foodDish) => foodDish.id === id);
		if (!foodDishById) {
			throw new Error("Food dish not found");
		}

		const foodDishDetails = foodDishesDetails.find(
			(foodDishDetail) => foodDishDetail.foodDishesId === id,
		);
		if (!foodDishDetails) {
			throw new Error("details not found for the food dish requested");
		}

		return new Promise((resolve) => {
			resolve(foodDishDetails);
		});
	}
}
