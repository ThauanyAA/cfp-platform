import { Injectable } from '@nestjs/common';
import { SpeakerDTO } from '@cfp-platform/shared-types';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CfpService {
  private submissions: SpeakerDTO[] = [];

  create(submission: CreateSpeakerDto): SpeakerDTO {
    const newSubmission: SpeakerDTO = {
      ...submission,
      id: submission.id || randomUUID(),
    };
    this.submissions.push(newSubmission);
    return newSubmission;
  }

  findAll(): SpeakerDTO[] {
    return this.submissions;
  }
}
