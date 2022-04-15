import { getModelForClass, prop } from "@typegoose/typegoose";

export class Color {
  @prop({ type: String })
  public name!: string;

  @prop({ type: String })
  public hex!: string;
}

export default getModelForClass(Color);
