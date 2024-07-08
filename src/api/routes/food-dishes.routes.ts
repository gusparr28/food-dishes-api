import { Hono } from "hono";
import {
	getFoodDishDetailsById,
	getFoodDishes,
} from "../controllers/food-dishes.controllers";

const foodDishesRoutes = new Hono().basePath("/food-dishes");

foodDishesRoutes.get("/", getFoodDishes);
foodDishesRoutes.get("/:id", getFoodDishDetailsById);

export default foodDishesRoutes;
