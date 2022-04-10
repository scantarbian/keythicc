import { Ref, getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Billing } from "./Billing";
import { Shipping } from "./Shipping";
import { Cart } from "./Cart";
export class Account extends TimeStamps {
  @prop({ type: String })
  public email!: string;

  @prop({ type: String })
  public password!: string;

  @prop({ type: String })
  public fullname!: string;

  @prop({ type: Boolean, default: false })
  public verified!: boolean;

  @prop({ type: String })
  public googleId?: string;

  @prop({ type: String })
  public image?: string;

  @prop({ type: Boolean, default: false })
  public administrator!: boolean;

  @prop({ ref: () => Billing, type: () => Array })
  public billing?: Ref<Billing>[];

  @prop({ ref: () => Shipping, type: () => Array })
  public shipping?: Ref<Shipping>[];

  @prop({ type: Number, default: 0 })
  public keythiccPoints!: number;

  // @prop({ ref: () => Cart })
  // public cart?: Ref<Cart>;
}

export default getModelForClass(Account);
