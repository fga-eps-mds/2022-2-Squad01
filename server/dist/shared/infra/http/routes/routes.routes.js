"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routesRoutes = void 0;
var _express = require("express");
var _ensureAuthenticated = _interopRequireDefault(require("../../../middlewares/ensureAuthenticated"));
var _CreateRouteController = require("../../../../modules/routes/useCases/createRoute/CreateRouteController");
var _ListRoutesController = require("../../../../modules/routes/useCases/listRoutes/ListRoutesController");
var _UpdateRouteController = require("../../../../modules/routes/useCases/updateRoute/UpdateRouteController");
var _ListRoutesByNeighborhoodController = require("../../../../modules/routes/useCases/listRoutesByNeighborhoodUseCase/ListRoutesByNeighborhoodController");
var _ListRoutesByUserController = require("../../../../modules/routes/useCases/listRoutesByUser/ListRoutesByUserController");
var _DeleteRouteController = require("../../../../modules/routes/useCases/deleteRoute/DeleteRouteController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const routesRoutes = (0, _express.Router)();
exports.routesRoutes = routesRoutes;
const createRouteController = new _CreateRouteController.CreateRouteController();
const listRoutesController = new _ListRoutesController.ListRoutesController();
const listRoutesByUserController = new _ListRoutesByUserController.ListRoutesByUserController();
const listRoutesByNeighborhoodController = new _ListRoutesByNeighborhoodController.ListRoutesByNeighborhoodController();
const updateRouteController = new _UpdateRouteController.UpdateRouteController();
const deleteRouteController = new _DeleteRouteController.DeleteRouteController();
routesRoutes.post("/", _ensureAuthenticated.default, createRouteController.handle);
routesRoutes.get("/neighborhood/:neighborhood", _ensureAuthenticated.default, listRoutesByNeighborhoodController.handle);
routesRoutes.get("/all", _ensureAuthenticated.default, listRoutesController.handle);
routesRoutes.get("/user", _ensureAuthenticated.default, listRoutesByUserController.handle);
routesRoutes.patch("/:id", _ensureAuthenticated.default, updateRouteController.handle);
routesRoutes.delete("/:id", _ensureAuthenticated.default, deleteRouteController.handle);