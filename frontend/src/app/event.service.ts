import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventDTO } from '@cfp-platform/shared-types';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private http = inject(HttpClient);

  submitEvent(event: Omit<EventDTO, 'id'>): Observable<EventDTO> {
    return this.http.post<EventDTO>('/api/events', event);
  }

  getEvents(): Observable<EventDTO[]> {
    return this.http.get<EventDTO[]>('/api/events');
  }
}
