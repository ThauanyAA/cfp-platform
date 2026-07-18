import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpeakerDTO } from '@cfp-platform/shared-types';

@Injectable({
  providedIn: 'root',
})
export class CfpService {
  private http = inject(HttpClient);

  submitCfp(speaker: Omit<SpeakerDTO, 'id'>): Observable<SpeakerDTO> {
    return this.http.post<SpeakerDTO>('/api/cfp', speaker);
  }
}
