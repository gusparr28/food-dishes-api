import { Hono } from "hono";
import {
	getFoodDishDetailsById,
	getFoodDishes,
} from "../controllers/food-dishes.controller";

const foodDishesRoutes = new Hono().basePath("/food-dishes");

foodDishesRoutes.get("/", getFoodDishes);
foodDishesRoutes.get("/:id", getFoodDishDetailsById);

export default foodDishesRoutes;
