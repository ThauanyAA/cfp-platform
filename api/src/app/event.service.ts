import { Injectable } from '@nestjs/common';
import { EventDTO } from '@cfp-platform/shared-types';
import { CreateEventDto } from './dto/create-event.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class EventService {
  private events: EventDTO[] = [];

  create(eventData: CreateEventDto): EventDTO {
    const newEvent: EventDTO = {
      ...eventData,
      id: randomUUID(),
    };
    this.events.push(newEvent);
    return newEvent;
  }

  findAll(): EventDTO[] {
    return this.events;
  }
}
