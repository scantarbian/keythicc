import { getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
export class Account extends TimeStamps {
  @prop({ type: String })
  public email!: string;

  @prop({ type: String })
  public password?: string;

  @prop({ type: String })
  public fullname?: string;

  @prop({ type: Boolean, default: false })
  public verified?: boolean;

  @prop({ type: String })
  public googleId?: string;

  @prop({ type: String })
  public image?: string;

  @prop({ type: Boolean, default: false })
  public administrator?: boolean;

  @prop({ type: Number, default: 0 })
  public keythiccPoints?: number;

  // @prop({ ref: () => Order, type: Array })
  // public orders?: Ref<Order>[];

  // @prop({ ref: () => Cart })
  // public cart?: Ref<Cart>;
}

export default getModelForClass(Account);
