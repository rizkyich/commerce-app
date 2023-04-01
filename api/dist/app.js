"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.env = config_1.NODE_ENV || 'development';
        this.port = parseInt(config_1.PORT) || 3001;
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
    }
    getServer() {
        return this.app;
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 App listening on the port ${this.port}`);
        });
    }
    initializeMiddlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    initializeRoutes(routes) {
        routes.forEach(route => {
            this.app.use("/store/v1", route.router);
        });
    }
}
exports.App = App;
