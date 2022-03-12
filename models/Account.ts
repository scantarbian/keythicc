import { Ref, getModelForClass, prop } from "@typegoose/typegoose";

export class Account {
  @prop({ type: String })
  public email!: string;

  @prop({ type: String })
  public password!: string;

  @prop({ type: String })
  public username!: string;

  @prop({ type: Boolean, default: false })
  public verified!: boolean;

  @prop({ type: Boolean, default: false })
  public administrator!: boolean;

  @prop({ default: new Date().toISOString(), type: Date })
  public createdAt!: Date;

  @prop({ default: new Date().toISOString(), type: Date })
  public updatedAt!: Date;
}

export default getModelForClass(Account);
