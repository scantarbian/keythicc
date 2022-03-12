import { getModelForClass, prop } from "@typegoose/typegoose";

export class Category {
  @prop({ type: String })
  public name!: string;
}

export default getModelForClass(Category);
