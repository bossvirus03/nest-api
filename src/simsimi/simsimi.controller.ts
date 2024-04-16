import { Controller } from '@nestjs/common';
import { SimsimiService } from './simsimi.service';

@Controller('simsimi')
export class SimsimiController {
  constructor(private readonly simsimiService: SimsimiService) {}
}
