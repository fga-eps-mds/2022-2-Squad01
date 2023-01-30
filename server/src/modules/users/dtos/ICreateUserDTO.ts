export interface ICreateUserDTO {
  email: string,
  name: string,
  enrollment: string,
  password: string,
  cellphone: string,
  instagram?: string,
  verificationCode: number
}