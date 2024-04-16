// api-key.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { ApiKey } from './api-key/schemas/api-key.schema';
import { ApiKeyService } from './api-key/api-key.service';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.query.apiKey;
    if (!apiKey) {
      return res.status(401).json({ message: 'API Key is required' });
    }

    const apiKeyExists = await this.apiKeyService.checkApiKey(apiKey as string);

    if (!apiKeyExists) {
      return res.status(403).json({ message: 'Invalid API Key or expired' });
    }

    next();
  }
}
