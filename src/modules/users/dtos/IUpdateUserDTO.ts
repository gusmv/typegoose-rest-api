import { Types } from 'mongoose';

export default interface IUpdateUserDTO {
  userId: Types.ObjectId;
  name?: string;
  birthDate?: Date;
  email?: string;
  password?: string;
}
