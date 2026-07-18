import { IsNotEmpty, IsEmail, IsBoolean, IsString } from 'class-validator';
import { SpeakerDTO } from '@cfp-platform/shared-types';

export class CreateSpeakerDto implements SpeakerDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  talkTitle: string;

  @IsBoolean()
  isGDE: boolean;
}
