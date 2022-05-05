import { getModelForClass, prop } from "@typegoose/typegoose";

export class Shipping {
  @prop({ type: String })
  public fullname!: string;

  @prop({ type: String })
  public company?: string;

  @prop({ type: String })
  public country!: number;

  @prop({ type: Number })
  public province?: number;

  @prop({ type: Number })
  public city?: number;

  @prop({ type: Number })
  public suburb?: number;

  @prop({ type: Number })
  public area?: number;

  @prop({ type: String })
  public address!: string;

  @prop({ type: String })
  public postalcode!: string;

  @prop({ type: String })
  public phonenumber!: string;
}

export default getModelForClass(Shipping);
