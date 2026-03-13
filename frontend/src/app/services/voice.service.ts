import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  VoiceTranscriptionRequest,
  VoiceTranscriptionResponse,
} from '../models/health-record.model';

@Injectable({
  providedIn: 'root',
})
export class VoiceService {
  private readonly AI_URL = `${environment.aiServiceUrl}/voice`;

  constructor(private http: HttpClient) {}

  transcribeAudio(
    request: VoiceTranscriptionRequest
  ): Observable<VoiceTranscriptionResponse> {
    return this.http.post<VoiceTranscriptionResponse>(
      `${this.AI_URL}/transcribe`,
      request
    );
  }

  analyzeSymptoms(transcription: string): Observable<{ analysis: string; recommendations: string[] }> {
    return this.http.post<{ analysis: string; recommendations: string[] }>(
      `${this.AI_URL}/analyze`,
      { transcription }
    );
  }
}
