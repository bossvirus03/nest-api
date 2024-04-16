import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { ApiKey, ApiKeyDocument } from './schemas/api-key.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import * as dayjs from 'dayjs';
@Injectable()
export class ApiKeyService {
  @InjectModel(ApiKey.name)
  private apiKeyModel: SoftDeleteModel<ApiKeyDocument>;
  async generateApiKey(expirationDate) {
    const apiKey = uuidv4();
    const newApiKey = await this.apiKeyModel.create({ apiKey, expirationDate });
    return newApiKey;
  }

  async findByKey(apiKey: string): Promise<ApiKey | undefined> {
    return this.apiKeyModel.findOne({ apiKey });
  }

  async checkApiKey(apiKey: string): Promise<boolean> {
    const today = dayjs();
    const foundApiKey = await this.apiKeyModel.findOne({ apiKey }).exec();
    const dateToCompare = dayjs(foundApiKey.expirationDate, 'MM/DD/YYYY');
    if (foundApiKey.expirationDate && foundApiKey.expirationDate == 'NEVER') {
      return true;
    } else if (foundApiKey.expirationDate && dateToCompare.isAfter(today)) {
      return true;
    } else {
      return false;
    }
  }
}
