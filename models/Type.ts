import { getModelForClass, prop } from "@typegoose/typegoose";

// type refers to the actual type of the item
// keyboard / keycaps / switches
export class Type {
  @prop({ type: String })
  public name!: string;
}

export default getModelForClass(Type);
