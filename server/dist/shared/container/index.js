"use strict";

var _tsyringe = require("tsyringe");
require("../../modules/users/container");
require("../../modules/routes/container");
var _nodemailerMailAdapter = require("../adapters/nodemailer/nodemailer-mail-adapter");
_tsyringe.container.registerSingleton("MailAdapter", _nodemailerMailAdapter.NodemailerMailAdapter);