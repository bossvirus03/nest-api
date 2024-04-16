import { Module } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { ApiKeyController } from './api-key.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiKey, ApiKeySchema } from './schemas/api-key.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ApiKey.name, schema: ApiKeySchema }]),
  ],
  controllers: [ApiKeyController],
  providers: [ApiKeyService],
  exports: [ApiKeyService],
})
export class ApiKeyModule {}
