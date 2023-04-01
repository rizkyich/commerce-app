"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const typedi_1 = require("typedi");
const product_service_1 = require("../services/product.service");
class ProductController {
    constructor() {
        this.product = typedi_1.Container.get(product_service_1.ProductService);
        this.getProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const allProductData = yield this.product.findAllProduct();
                const responseData = {
                    products: allProductData,
                    message: "findAll"
                };
                res.status(200).json(responseData);
            }
            catch (error) {
                res.status(500).json({ message: "Something went wrong" });
            }
        });
    }
}
exports.ProductController = ProductController;
