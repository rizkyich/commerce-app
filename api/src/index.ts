import { App } from "./app";
import ProductRoute from "./routes/products.route";

const app = new App([
  new ProductRoute(),
]);

app.listen();
