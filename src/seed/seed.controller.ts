import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { SeedService } from './seed.service';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @ApiOkResponse({ description: 'Ejecucion completa de los seed', type: String })
  execureSeed() {
    return this.seedService.runSeed();
  }
}
