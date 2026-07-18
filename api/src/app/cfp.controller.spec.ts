import { Test, TestingModule } from '@nestjs/testing';
import { CfpController } from './cfp.controller';
import { CfpService } from './cfp.service';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { ValidationPipe, ArgumentMetadata, BadRequestException } from '@nestjs/common';

describe('CfpController', () => {
  let controller: CfpController;
  let service: CfpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CfpController],
      providers: [CfpService],
    }).compile();

    controller = module.get<CfpController>(CfpController);
    service = module.get<CfpService>(CfpService);
  });

  describe('create', () => {
    it('should save and return a valid cfp submission', () => {
      const dto: CreateSpeakerDto = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        talkTitle: 'NestJS and Signals',
        isGDE: false,
      };

      const result = controller.create(dto);
      expect(result).toEqual(dto);
      expect(service.findAll()).toContainEqual(dto);
    });
  });

  describe('ValidationPipe', () => {
    let validator: ValidationPipe;
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: CreateSpeakerDto,
      data: '',
    };

    beforeEach(() => {
      validator = new ValidationPipe({ transform: true, whitelist: true });
    });

    it('should pass validation with valid payload', async () => {
      const validPayload = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        talkTitle: 'NestJS and Signals',
        isGDE: false,
      };

      const result = await validator.transform(validPayload, metadata);
      expect(result).toEqual(validPayload);
    });

    it('should fail validation when email is invalid', async () => {
      const invalidPayload = {
        id: '1',
        name: 'John Doe',
        email: 'invalid-email',
        talkTitle: 'NestJS and Signals',
        isGDE: false,
      };

      await expect(validator.transform(invalidPayload, metadata)).rejects.toThrow(
        BadRequestException
      );
    });

    it('should fail validation when name is missing', async () => {
      const invalidPayload = {
        id: '1',
        email: 'john@example.com',
        talkTitle: 'NestJS and Signals',
        isGDE: false,
      };

      await expect(validator.transform(invalidPayload, metadata)).rejects.toThrow(
        BadRequestException
      );
    });

    it('should fail validation when talkTitle is missing', async () => {
      const invalidPayload = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        isGDE: false,
      };

      await expect(validator.transform(invalidPayload, metadata)).rejects.toThrow(
        BadRequestException
      );
    });
  });
});
