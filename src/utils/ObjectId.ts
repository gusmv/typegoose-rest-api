import { Types } from 'mongoose';

function validate(ObjectId: any): boolean {
  return Types.ObjectId.isValid(ObjectId);
}

export default validate;
