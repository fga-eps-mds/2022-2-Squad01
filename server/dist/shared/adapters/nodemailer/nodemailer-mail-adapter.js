"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodemailerMailAdapter = void 0;
var _AppError = require("../../errors/AppError");
var _nodemailer = _interopRequireDefault(require("nodemailer"));
require("dotenv/config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const transport = _nodemailer.default.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});
class NodemailerMailAdapter {
  async sendMail({
    subject,
    body,
    user_email
  }) {
    try {
      await transport.sendMail({
        from: "Equipe Vambora <vamboramds@gmail.com>",
        to: user_email,
        subject: subject,
        html: body
      });
    } catch (error) {
      throw new _AppError.AppError("Error sending email");
    }
  }
}
exports.NodemailerMailAdapter = NodemailerMailAdapter;