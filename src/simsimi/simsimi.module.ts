import { Module } from '@nestjs/common';
import { SimsimiService } from './simsimi.service';
import { SimsimiController } from './simsimi.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { Simsimi } from './model/simsimi.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      logging: false,
      dialect: 'sqlite',
      storage: join(process.cwd(), '/src/simsimi/db/simsimi.sqlite'),
      define: {
        timestamps: false,
      },
      models: [Simsimi],
    }),
    SequelizeModule.forFeature([Simsimi]),
  ],
  controllers: [SimsimiController],
  providers: [SimsimiService],
})
export class SimsimiModule {}
