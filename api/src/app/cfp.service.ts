import { Injectable } from '@nestjs/common';
import { SpeakerDTO } from '@cfp-platform/shared-types';
import { CreateSpeakerDto } from './dto/create-speaker.dto';

@Injectable()
export class CfpService {
  private submissions: SpeakerDTO[] = [];

  create(submission: CreateSpeakerDto): SpeakerDTO {
    this.submissions.push(submission);
    return submission;
  }

  findAll(): SpeakerDTO[] {
    return this.submissions;
  }
}
