import { getModelForClass, prop } from "@typegoose/typegoose";

export class Type {
  @prop({ type: String })
  public name!: string;
}

export default getModelForClass(Type);
