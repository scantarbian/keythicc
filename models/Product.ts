import { Ref, getModelForClass, prop, plugin } from "@typegoose/typegoose";
import autopopulate from "mongoose-autopopulate";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Type } from "./Type";
import { Category } from "./Category";
import { Account } from "./Account";
import { Image } from "./Image";

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

  @prop({ type: Boolean, default: false })
  public customizabe!: boolean;

  @prop({ ref: () => Type })
  public type!: Ref<Type>;

  @prop({ ref: () => Category })
  public category!: Ref<Category>;

  @prop({ ref: () => Account })
  public createdBy!: Ref<Account>;

  @prop({ type: Number, default: 0 })
  public keythiccPoints!: number;

  @prop({ type: String })
  public footnote?: string;

  // these are only applicable if the type is keyboard
  @prop({ ref: () => Product, autopopulate: true })
  public baseKeycaps?: Ref<Product>;

  @prop({ ref: () => Product, autopopulate: true })
  public baseSwitches?: Ref<Product>;
}

export default getModelForClass(Product);
