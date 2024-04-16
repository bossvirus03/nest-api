import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ApiKeyDocument = HydratedDocument<ApiKey>;

@Schema()
export class ApiKey {
  @Prop()
  apiKey: string;

  @Prop()
  type: string;

  @Prop()
  expirationDate: string;
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
