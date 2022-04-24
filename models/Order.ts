import { Ref, getModelForClass, prop, plugin } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import autopopulate from "mongoose-autopopulate";

import { Billing } from "./Billing";
import { Shipping } from "./Shipping";
import { Product } from "./Product";
import { Builder } from "./Builder";

@plugin(autopopulate as any)
export class Order extends TimeStamps {
  @prop({ ref: () => Product, autopopulate: true, type: Array })
  public items!: Ref<Product>[];

  @prop({ ref: () => Builder, autopopulate: true, type: Array })
  public builderItems?: Ref<Builder>[];

  @prop({ ref: () => Billing, autopopulate: true })
  public billing?: Ref<Billing>;

  @prop({ ref: () => Shipping, autopopulate: true })
  public shipping?: Ref<Shipping>;

  @prop({ type: Number, default: 0 })
  public keythiccPoints?: number;

  @prop({ type: Number, default: 0 })
  public shippingPrice?: number;

  @prop({ type: Number, default: 0 })
  public totalPrice?: number;
}

export default getModelForClass(Order);
