import { getModelForClass, prop } from "@typegoose/typegoose";

export class Shipping {
  @prop({ type: String })
  public fullname!: string;

  @prop({ type: String })
  public company?: string;

  @prop({ type: String })
  public country!: string;

  @prop({ type: String })
  public address!: string;

  @prop({ type: String })
  public postalcode!: string;

  @prop({ type: String })
  public phonenumber!: string;
}

export default getModelForClass(Shipping);
