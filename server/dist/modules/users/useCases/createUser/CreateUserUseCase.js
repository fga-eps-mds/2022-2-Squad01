"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserUseCase = void 0;
var _tsyringe = require("tsyringe");
var brcypt = _interopRequireWildcard(require("bcryptjs"));
var _AppError = require("../../../../shared/errors/AppError");
var _IUsersRepository = require("../../repositories/IUsersRepository");
var _mailAdapter = require("../../../../shared/adapters/mail-adapter");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
let CreateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("MailAdapter")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _mailAdapter.IMailAdapter === "undefined" ? Object : _mailAdapter.IMailAdapter]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateUserUseCase {
  constructor(usersRepository, mailAdapter) {
    this.usersRepository = usersRepository;
    this.mailAdapter = mailAdapter;
  }
  async execute({
    email,
    name,
    enrollment,
    password,
    cellphone,
    instagram
  }) {
    if (!email || !name || !enrollment || !password || !cellphone) {
      throw new _AppError.AppError("Missing parameters");
    }
    if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(password)) {
      throw new _AppError.AppError("Password must contain at least 8 characters, one capital letter and one number");
    }
    const domain = email.split("@")[1];
    if (domain !== "aluno.unb.br" && domain !== "unb.br") {
      throw new _AppError.AppError("Cannot create e-mail from outside UnB.");
    }
    const userExists = await this.usersRepository.findUser(email);
    if (userExists) {
      throw new _AppError.AppError("User already exists!");
    }
    const verificationCode = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
    const hashedPassword = await brcypt.hash(password, 10);
    console.log("Tentando enviar o e-mail");
    await this.mailAdapter.sendMail({
      subject: "Seja bem-vindo(a) ao Vambora!",
      body: ["<body style=\"background-color: #8257e6; padding: 50px; color: #ffffff\">", "<div style=\"text-align: center;\">", `<h1 style="font-size: 24px; font-weight: bold; margin-bottom: 50px;">Olá ${name.split(" ")[0]}, seja bem-vindo(a) ao Vambora!</h1>`, "<h2>Seu código de verificação é:</h2>", `<h2><strong>${verificationCode}</strong></h2>`, "</div>", "</body>"].join("\n"),
      user_email: email
    });
    console.log("E-mail enviado com sucesso!");
    const user = await this.usersRepository.create({
      email,
      name,
      enrollment,
      password: hashedPassword,
      cellphone,
      instagram,
      verificationCode: parseInt(verificationCode)
    });
    return user;
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.CreateUserUseCase = CreateUserUseCase;