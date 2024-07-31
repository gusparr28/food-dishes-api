import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import foodDishesRoutes from "./infrastructure/api/routes/food-dishes.route";

const app = new Hono().basePath("/api");

app.use(
	cors({
		origin: "*",
	}),
);
app.use(logger());

app.route("/", foodDishesRoutes);

export default app;
