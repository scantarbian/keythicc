import { Ref, getModelForClass, prop } from "@typegoose/typegoose";
import { Billing } from "./Billing";
import { Shipping } from "./Shipping";

export class Account {
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

  @prop({ ref: () => Billing })
  public billing?: Ref<Billing>;

  @prop({ ref: () => Shipping })
  public shipping?: Ref<Shipping>;

  @prop({ default: new Date().toISOString(), type: Date })
  public createdAt!: Date;

  @prop({ default: new Date().toISOString(), type: Date })
  public updatedAt!: Date;
}

export default getModelForClass(Account);
