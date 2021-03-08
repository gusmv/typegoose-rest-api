import { Types } from 'mongoose';

export default interface ICreateUserDTO {
  id?: Types.ObjectId;
  name: string;
  birthDate: Date;
  email: string;
  password: string;
}
