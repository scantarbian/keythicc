import { getModelForClass, prop } from "@typegoose/typegoose";

export class Case {
  @prop({ type: String })
  public name!: string;

  @prop({ type: String })
  public description?: string;
}

export default getModelForClass(Case);
