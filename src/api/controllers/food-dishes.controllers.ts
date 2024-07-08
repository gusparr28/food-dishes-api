import type { Context } from "hono";
import FoodDishesService from "../../services/foodDishes/impl/food-dishes.service";

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
	const { id } = ctx.req.param();

	try {
		const { foodDishDetailsId, foodDishesId, ...foodDishDetailsById } =
			await foodDishesService.findFoodDishDetailsById(id);

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
