import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Account } from "./Account";

export class Address {
  @prop({ ref: () => Account })
  public account?: Ref<Account>;

  @prop({ type: String })
  public email?: string;

  @prop({ type: String })
  public fullname!: string;

  @prop({ type: String })
  public company?: string;

  @prop({ type: Object })
  public country!: {
    value: number;
    label: string;
  };

  @prop({ type: Object })
  public province?: {
    value: number;
    label: string;
  };

  @prop({ type: Object })
  public city?: {
    value: number;
    label: string;
  };

  @prop({ type: Object })
  public suburb?: {
    value: number;
    label: string;
  };

  @prop({ type: Object })
  public area?: {
    value: number;
    label: string;
  };

  @prop({ type: String })
  public address!: string;

  @prop({ type: String })
  public postalcode!: string;

  @prop({ type: String })
  public phonenumber!: string;
}

export default getModelForClass(Address);
