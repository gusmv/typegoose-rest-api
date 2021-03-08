import { Types } from 'mongoose';

interface IPassword {
  old?: string;
  new?: string;
  confirmation?: string;
}

export default interface IUpdateUserDTO {
  userId: Types.ObjectId;
  name?: string;
  birthDate?: Date;
  email?: string;
  password?: IPassword;
}
