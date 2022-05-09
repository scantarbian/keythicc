import { Ref, getModelForClass, prop, plugin } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import autopopulate from "mongoose-autopopulate";

import { Billing } from "./Billing";
import { Address } from "./Address";
import { Product } from "./Product";
import { Builder } from "./Builder";
import { Account } from "./Account";

@plugin(autopopulate as any)
export class Order extends TimeStamps {
  @prop({ ref: () => Account })
  public account?: Ref<Account>;

  @prop({ type: String })
  public email?: string;

  @prop({ ref: () => Product, autopopulate: true, type: Array })
  public items!: Ref<Product>[];

  @prop({ ref: () => Builder, autopopulate: true, type: Array })
  public builderItems?: Ref<Builder>[];

  // @prop({ ref: () => Billing, autopopulate: true })
  // public billing?: Ref<Billing>;

  @prop({ ref: () => Address, autopopulate: true })
  public destination: Ref<Address>;

  // order id generated by shipper
  @prop({ type: String })
  public shipperId?: string;

  // shipper rate_id
  @prop({ type: Object })
  public shipperServiceData!: {
    logisticName: string;
    rateName: string;
    rateId: number;
    finalPrice: number;
  };

  // shipper status
  @prop({ type: String })
  public shipperStatus?: string;

  // transaction id from midtrans
  @prop({ type: String })
  public transactionId?: string;

  // midtrans transaction status
  @prop({ type: String })
  public transactionStatus?: string;

  @prop({ type: Number })
  public keythiccPoints?: number;

  @prop({ type: Number })
  public price!: number;
}

export default getModelForClass(Order);
