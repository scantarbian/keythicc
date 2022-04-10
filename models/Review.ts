import { Ref, getModelForClass, prop, plugin } from "@typegoose/typegoose";
import autopopulate from "mongoose-autopopulate";
import { Account } from "./Account";
import { Product } from "./Product";

@plugin(autopopulate as any)
export class Review {
  @prop({ type: Number, default: 0 })
  public stars!: number;

  @prop({ type: String, default: "" })
  public review?: string;

  @prop({ ref: () => Product, autopopulate: true })
  public product!: Ref<Product>;

  @prop({ ref: () => Account, autopopulate: true })
  public reviewer!: Ref<Account>;
}

export default getModelForClass(Review);
