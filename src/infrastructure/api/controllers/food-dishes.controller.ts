import type { Context } from "hono";

import { FoodDishesService } from "../../../application/services/food-dishes.service";

const foodDishesService = new FoodDishesService();

export const getFoodDishes = async (ctx: Context) => {
	const foodDishes = await foodDishesService.findFoodDishes();

	return ctx.json(
		{
			statusCode: 200,
			data: foodDishes,
		},
		200,
	);
};

export const getFoodDishDetailsById = async (ctx: Context) => {
	const { id: foodDishId } = ctx.req.param();
	const { plateType } = ctx.req.query();

	try {
		const { id, idFoodDish, ...foodDishDetailsById } =
			await foodDishesService.findFoodDishDetailsById(
				Number.parseInt(foodDishId),
				plateType,
			);

		return ctx.json(
			{
				statusCode: 200,
				data: foodDishDetailsById,
			},
			200,
		);
	} catch (error) {
		if (error instanceof Error) {
			return ctx.json(
				{
					statusCode: 500,
					error: {
						message: error.message,
					},
				},
				500,
			);
		}

		return ctx.json(
			{
				statusCode: 500,
				error,
			},
			500,
		);
	}
};
