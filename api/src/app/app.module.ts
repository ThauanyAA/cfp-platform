import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CfpController } from './cfp.controller';
import { CfpService } from './cfp.service';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [],
  controllers: [AppController, CfpController, EventController],
  providers: [AppService, CfpService, EventService],
})
export class AppModule {}
