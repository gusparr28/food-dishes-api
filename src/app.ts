import { Hono } from "hono";
import { logger } from "hono/logger";

import foodDishesRoutes from "./api/routes/food-dishes.routes";

const app = new Hono().basePath("/api");

app.use(logger());

app.route("/", foodDishesRoutes);

export default app;
