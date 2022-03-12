import { Ref, getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Category } from "./Category";
import { Account } from "./Account";

export class Product extends TimeStamps {
  @prop({ type: String })
  public name!: string;

  @prop({ type: () => [String], default: [] })
  public image!: string[];

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
