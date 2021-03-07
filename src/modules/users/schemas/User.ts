import {
  prop as column,
  getModelForClass,
  modelOptions,
  plugin,
} from '@typegoose/typegoose';

import mhidden from 'mongoose-hidden';

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  },
})
@plugin(mhidden())
export class User {
  @column()
  public name: string;

  @column()
  public birthDate: Date;

  @column()
  public email: string;

  @column({ hide: true })
  public password: string;
}

export default getModelForClass(User);
