import { Ref, getModelForClass, prop, plugin } from "@typegoose/typegoose";
import autopopulate from "mongoose-autopopulate";
import { Account } from "./Account";
import { Product } from "./Product";
import { Color } from "./Color";

// handles custom keyboard built through the builder
@plugin(autopopulate as any)
export class Builder {
  @prop({ ref: () => Product, autopopulate: true })
  public baseKeyboard!: Ref<Product>;

  @prop({ ref: () => Color, autopopulate: true })
  public keyboardColor!: Ref<Color>;

  @prop({ type: String })
  public keyboardSize!: string;

  @prop({ ref: () => Product, autopopulate: true })
  public keyboardCase!: Ref<Product>;

  @prop({ ref: () => Product, autopopulate: true })
  public keycaps!: Ref<Product>;

  @prop({ ref: () => Product, autopopulate: true })
  public switches!: Ref<Product>;

  @prop({ ref: () => Account, autopopulate: true })
  public builder!: Ref<Account>;
}

export default getModelForClass(Builder);
