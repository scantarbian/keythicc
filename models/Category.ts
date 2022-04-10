import { getModelForClass, prop } from "@typegoose/typegoose";

// category refers to the product categories in the product page
export class Category {
  @prop({ type: String })
  public name!: string;
}

export default getModelForClass(Category);
