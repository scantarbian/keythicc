import { Ref, getModelForClass, prop } from "@typegoose/typegoose";
import { Category } from "./Category";
import { Account } from "./Account";

export class Product {
  @prop({ type: String })
  public name!: string;

  @prop({ type: String })
  public image!: string;

  @prop({ type: String })
  public description!: string;

  @prop({ type: Int32Array })
  public basePrice!: Int32Array;

  @prop({ type: Int32Array })
  public stock!: Int32Array;

  @prop({ ref: () => Category })
  public category!: Ref<Category>;

  @prop({ ref: () => Account })
  public createdBy!: Ref<Account>;

  @prop({ default: new Date().toISOString(), type: Date })
  public createdAt!: Date;

  @prop({ default: new Date().toISOString(), type: Date })
  public updatedAt!: Date;
}

export default getModelForClass(Product);
