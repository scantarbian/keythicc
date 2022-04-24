import { getModelForClass, prop } from "@typegoose/typegoose";

export class Billing {
  @prop({ type: String })
  public type!: string;

  @prop({ type: String })
  public number!: string;

  @prop({ type: String })
  public expiry?: string;
}

export default getModelForClass(Billing);
