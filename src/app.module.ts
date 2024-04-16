import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiKeyModule } from './api-key/api-key.module';
import { MongooseModule } from '@nestjs/mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { ApiKeyMiddleware } from './api-key.middleware';
import { DlModule } from './dl/dl.module';
import { SimsimiModule } from './simsimi/simsimi.module';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        connectionFactory: (connection) => {
          connection.plugin(softDeletePlugin);
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
    }),
    ApiKeyModule,
    DlModule,
    SimsimiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('/');
  }
}
