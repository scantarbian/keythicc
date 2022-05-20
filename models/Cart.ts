import { Ref, getModelForClass, prop, plugin } from "@typegoose/typegoose";
import autopopulate from "mongoose-autopopulate";
import { Product } from "./Product";
import { Builder } from "./Builder";
import { Account } from "./Account";

@plugin(autopopulate as any)
export class Cart {
  @prop({ ref: () => Account })
  public account?: Ref<Account>;

  @prop({ ref: () => Product, autopopulate: true, type: Array })
  public items!: Ref<Product>[];

  @prop({ ref: () => Builder, autopopulate: true, type: Array })
  public builderItems?: Ref<Builder>[];
}

export default getModelForClass(Cart);
