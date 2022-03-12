import { Ref, getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Billing } from "./Billing";
import { Shipping } from "./Shipping";

export class Account extends TimeStamps {
  @prop({ type: String })
  public email!: string;

  @prop({ type: String })
  public password!: string;

  @prop({ type: String })
  public fullname!: string;

  @prop({ type: Boolean, default: false })
  public verified!: boolean;

  @prop({ type: Boolean, default: false })
  public administrator!: boolean;

  @prop({ ref: () => Billing, type: () => [Billing] })
  public billing?: Ref<Billing>[];

  @prop({ ref: () => Shipping, type: () => [Shipping] })
  public shipping?: Ref<Shipping>[];
}

export default getModelForClass(Account);
