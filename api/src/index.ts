import { App } from "./app";

import ProductRoute from "./routes/products.route";
import CategoryRoute from "./routes/categories.route";

const app = new App([
  new ProductRoute(),
  new CategoryRoute(),
]);

app.listen();
