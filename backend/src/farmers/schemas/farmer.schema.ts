import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FarmerDocument = Farmer & Document & {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

@Schema({ timestamps: true })
export class Farmer {
  @Prop({ required: true, trim: true })
  fullName: string;

  @Prop({ required: true, unique: true, trim: true })
  cpf: string;

  @Prop({ type: Date })
  birthDate?: Date;

  @Prop({ trim: true })
  phone?: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const FarmerSchema = SchemaFactory.createForClass(Farmer);
