"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const products_route_1 = __importDefault(require("./routes/products.route"));
const app = new app_1.App([
    new products_route_1.default(),
]);
app.listen();
