import { Ref, getModelForClass, prop, plugin } from "@typegoose/typegoose";
import autopopulate from "mongoose-autopopulate";
import { Product } from "./Product";

@plugin(autopopulate as any)
export class Cart {
  @prop({ ref: () => Product, autopopulate: true, type: Array, default: [] })
  public items!: Ref<Product>[];
}

export default getModelForClass(Cart);
