import { Controller, Post, Body, Get } from '@nestjs/common';
import { CfpService } from './cfp.service';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { SpeakerDTO } from '@cfp-platform/shared-types';

@Controller('cfp')
export class CfpController {
  constructor(private readonly cfpService: CfpService) {}

  @Post()
  create(@Body() createSpeakerDto: CreateSpeakerDto): SpeakerDTO {
    return this.cfpService.create(createSpeakerDto);
  }

  @Get()
  findAll(): SpeakerDTO[] {
    return this.cfpService.findAll();
  }
}
