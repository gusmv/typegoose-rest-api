import { Types } from 'mongoose';
import { Expose, Exclude } from 'class-transformer';
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

import { User } from '@modules/users/schemas/User';

@modelOptions({
  schemaOptions: {
    collection: 'tokens',
  },
})
@Exclude()
export class Token {
  @prop()
  public id: Types.ObjectId;

  @prop()
  public token: string;

  @Expose()
  @prop({ ref: 'User' })
  public user: User | Types.ObjectId;

  @prop({ required: true, default: Date.now(), expires: '1m' })
  public createdAt?: Date;

  @prop({ required: true, default: Date.now() })
  public updatedAt?: Date;
}

export default getModelForClass(Token);
