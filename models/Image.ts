import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

export class Image {
  @prop({ type: String })
  public name!: string;

  @prop({ type: String })
  public path!: string;

  @prop({ type: Number })
  public width!: number;

  @prop({ type: Number })
  public height!: number;

  @prop({ type: Array })
  public tags?: mongoose.Types.Array<string>;
}

export default getModelForClass(Image);
