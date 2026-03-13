import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  HealthRecord,
  VoiceTranscriptionRequest,
  VoiceTranscriptionResponse,
} from '../models/health-record.model';

@Injectable({
  providedIn: 'root',
})
export class HealthRecordService {
  private readonly API_URL = `${environment.apiBaseUrl}/health-records`;

  constructor(private http: HttpClient) {}

  getHealthRecords(): Observable<HealthRecord[]> {
    return this.http.get<HealthRecord[]>(this.API_URL);
  }

  getHealthRecordById(id: number): Observable<HealthRecord> {
    return this.http.get<HealthRecord>(`${this.API_URL}/${id}`);
  }

  createHealthRecord(data: Partial<HealthRecord>): Observable<HealthRecord> {
    return this.http.post<HealthRecord>(this.API_URL, data);
  }

  deleteHealthRecord(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
