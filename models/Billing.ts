import { getModelForClass, prop } from "@typegoose/typegoose";

export class Billing {
  @prop({ type: String })
  public name!: string;

  @prop({ type: String })
  public basePrice!: string;
}

export default getModelForClass(Billing);
