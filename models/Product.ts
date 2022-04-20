import { Ref, getModelForClass, prop, plugin } from "@typegoose/typegoose";
import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Type } from "./Type";
import { Category } from "./Category";
import { Account } from "./Account";
import { Image } from "./Image";
import { Color } from "./Color";

export enum KeycapMaterial {
  ABS = "ABS",
  PBT = "PBT",
  POM = "POM",
}

export enum SwitchType {
  Linear = "Linear",
  Tactile = "Tactile",
  Clicky = "Clicky",
}

@plugin(autopopulate as any)
export class Product extends TimeStamps {
  @prop({ type: String })
  public name!: string;

  @prop({ ref: () => Image, autopopulate: true, type: Array, default: [] })
  public image!: Ref<Image>[];

  @prop({ type: String, default: "" })
  public description!: string;

  @prop({ type: Number, default: 0 })
  public basePrice!: number;

  @prop({ type: Number, default: 0 })
  public stock!: number;

  @prop({ ref: () => Type, autopopulate: true })
  public type!: Ref<Type>;

  @prop({ ref: () => Category })
  public category!: Ref<Category>;

  @prop({ ref: () => Account })
  public createdBy!: Ref<Account>;

  @prop({ type: Number, default: 0 })
  public keythiccPoints!: number;

  @prop({ type: String, default: "Keythicc" })
  public manufacturer!: string;

  @prop({ type: String })
  public footnote?: string;

  @prop({ type: Boolean, default: true })
  public display!: boolean;

  // these are only applicable if the type is "Keyboard"
  @prop({ type: Boolean })
  public customizable?: boolean;

  @prop({ ref: () => Product, autopopulate: true })
  public baseKeycaps?: Ref<Product>;

  @prop({ ref: () => Product, autopopulate: true })
  public baseSwitches?: Ref<Product>;

  @prop({ type: Boolean })
  public wireless?: boolean;

  @prop({ type: Array })
  public sizes?: mongoose.Types.Array<string>;

  @prop({ ref: () => Color, autopopulate: true })
  public colors?: Ref<Color>[];

  @prop({ ref: () => Product, autopopulate: true })
  public cases?: Ref<Product>[];

  // these are only applicable if the type is "Keycaps"
  @prop({ type: String, enum: KeycapMaterial })
  public material?: KeycapMaterial;

  // these are only applicable if the type is "Switches"
  @prop({ type: String, enum: SwitchType })
  public switchType?: SwitchType;

  // false = mechanical
  @prop({ type: Boolean })
  public optical?: boolean;

  @prop({ type: Number })
  public actuationDistance?: number;

  @prop({ type: Number })
  public actuationForce?: number;

  // viewer history (analytics)
  @prop({ type: Array, default: [] })
  public viewerHistory!: mongoose.Types.Array<string>;
}

export default getModelForClass(Product);
