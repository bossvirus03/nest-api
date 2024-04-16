import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { ApiKey, ApiKeyDocument } from './schemas/api-key.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class ApiKeyService {
  @InjectModel(ApiKey.name)
  private apiKeyModel: SoftDeleteModel<ApiKeyDocument>;
  async generateApiKey() {
    const apiKey = uuidv4();
    const newApiKey = await this.apiKeyModel.create({ apiKey });
    return newApiKey;
  }

  async findByKey(apiKey: string): Promise<ApiKey | undefined> {
    return this.apiKeyModel.findOne({ apiKey });
  }

  async checkApiKey(apiKey: string): Promise<boolean> {
    const foundApiKey = await this.apiKeyModel.findOne({ apiKey }).exec();
    return !!foundApiKey;
  }
}
