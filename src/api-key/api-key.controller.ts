import { Body, Controller, Post } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';

@Controller('api-key')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}
  @Post('/')
  async generateApiKey(
    @Body('expiration-date') date,
  ): Promise<{ apiKey: string }> {
    const apiKey = await this.apiKeyService.generateApiKey(date);
    return apiKey;
  }
}
