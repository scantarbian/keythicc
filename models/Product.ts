import { Ref, getModelForClass, prop, plugin } from "@typegoose/typegoose";
import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Category } from "./Category";
import { Account } from "./Account";
import { Image } from "./Image";

@plugin(autopopulate as any)
export class Product extends TimeStamps {
  @prop({ type: String })
  public name!: string;

  @prop({ ref: () => Image, autopopulate: true, type: Array })
  public image!: Ref<Image>[];

  @prop({ type: String })
  public description!: string;

  @prop({ type: Number })
  public basePrice!: number;

  @prop({ type: Number })
  public stock!: number;

  @prop({ ref: () => Category })
  public category!: Ref<Category>;

  @prop({ ref: () => Account })
  public createdBy!: Ref<Account>;

  @prop({ type: String })
  public footnote?: string;
}

export default getModelForClass(Product);
