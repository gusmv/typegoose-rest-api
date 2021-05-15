import { Types } from 'mongoose';
import { Expose, Exclude } from 'class-transformer';
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  },
})
@Exclude()
export class User {
  @Expose()
  public id: Types.ObjectId;

  @Expose()
  @prop()
  public name: string;

  @Expose()
  @prop()
  public birthDate: Date;

  @Expose()
  @prop()
  public email: string;

  @prop()
  @Exclude()
  public password: string;

  @prop()
  @Exclude()
  __v: number;
}

export default getModelForClass(User);
