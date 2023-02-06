"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;
var _express = require("express");
var _user = require("./user.routes");
var _routes = require("./routes.routes");
var _cars = require("./cars.routes");
var _rides = require("./rides.routes");
const router = (0, _express.Router)();
exports.router = router;
router.use("/user", _user.userRoutes);
router.use("/route", _routes.routesRoutes);
router.use("/car", _cars.carsRoutes);
router.use("/ride", _rides.ridesRoutes);