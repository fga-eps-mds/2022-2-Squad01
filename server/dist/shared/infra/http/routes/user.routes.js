"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoutes = void 0;
var _express = require("express");
var _CreateUserController = require("../../../../modules/users/useCases/createUser/CreateUserController");
var _DeleteUserController = require("../../../../modules/users/useCases/deleteUser/DeleteUserController");
var _LoginUserController = require("../../../../modules/users/useCases/loginUser/LoginUserController");
var _ReadUserController = require("../../../../modules/users/useCases/readUser/ReadUserController");
var _UpdateUserController = require("../../../../modules/users/useCases/updateUser/UpdateUserController");
var _VerifyUserController = require("../../../../modules/users/useCases/verifyUser/VerifyUserController");
var _ensureAuthenticated = _interopRequireDefault(require("../../../middlewares/ensureAuthenticated"));
var _RefreshUserTokenController = require("../../../../modules/users/useCases/refreshUserToken/RefreshUserTokenController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userRoutes = (0, _express.Router)();
exports.userRoutes = userRoutes;
const createUserController = new _CreateUserController.CreateUserController();
const verifyUserController = new _VerifyUserController.VerifyUserController();
const loginUserController = new _LoginUserController.LoginUserController();
const refreshUserTokenController = new _RefreshUserTokenController.RefreshUserTokenController();
const readUserController = new _ReadUserController.ReadUserController();
const updateUserController = new _UpdateUserController.UpdateUserController();
const deleteUserController = new _DeleteUserController.DeleteUserController();
userRoutes.post("/", createUserController.handle);
userRoutes.post("/verify", verifyUserController.handle);
userRoutes.post("/login", loginUserController.handle);
userRoutes.post("/refresh-token", refreshUserTokenController.handle);
userRoutes.get("/", _ensureAuthenticated.default, readUserController.handle);
userRoutes.patch("/", _ensureAuthenticated.default, updateUserController.handle);
userRoutes.delete("/", _ensureAuthenticated.default, deleteUserController.handle);