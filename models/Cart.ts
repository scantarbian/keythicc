import { Ref, getModelForClass, prop, plugin } from "@typegoose/typegoose";
import autopopulate from "mongoose-autopopulate";
import { Product } from "./Product";
import { Builder } from "./Builder";
import { Account } from "./Account";
import mongoose from "mongoose";

@plugin(autopopulate as any)
class CartItem {
  @prop({ ref: () => Product || Builder, autopopulate: true })
  public product?: Ref<Product> | Ref<Builder>;

  @prop({ type: Number })
  public quantity!: number;

  @prop({ type: Boolean })
  public selected!: boolean;
}

export class Cart {
  @prop({ ref: () => Account })
  public account!: Ref<Account>;

  @prop({ type: Array, default: [] })
  public items!: mongoose.Types.Array<CartItem>;
}

export default getModelForClass(Cart);
