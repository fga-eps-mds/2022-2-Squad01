export interface ICreateUserDTO {
  email: string,
  name: string,
  enrollment: string,
  password: string,
  verificationCode: number
  cellphone: string,
  instagram?: string,
}