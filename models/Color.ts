import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

export class Color {
  @prop({ type: String })
  public name!: string;

  @prop({ type: Array })
  public hex!: mongoose.Types.Array<string>;
}

export default getModelForClass(Color);
