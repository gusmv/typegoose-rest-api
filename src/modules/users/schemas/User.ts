import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    collection: "users",
    timestamps: true,
  },
})
export class User {
  @prop({ type: () => String })
  public name: string;

  @prop({ type: () => Date })
  public birthDate: Date;

  @prop({ type: () => String })
  public email: string;

  @prop({ type: () => String })
  private password: string;
}

export default getModelForClass(User);
