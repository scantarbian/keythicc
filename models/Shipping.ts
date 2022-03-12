import { getModelForClass, prop } from "@typegoose/typegoose";

export class Shipping {
  @prop({ type: String })
  public name!: string;

  @prop({ type: String })
  public basePrice!: string;
}

export default getModelForClass(Shipping);
