export interface HealthRecord {
  id: number;
  patientId: number;
  recordType: 'DIAGNOSIS' | 'PRESCRIPTION' | 'LAB_RESULT' | 'VOICE_NOTE';
  title: string;
  content: string;
  audioUrl?: string;
  transcription?: string;
  aiSummary?: string;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
}

export interface VoiceTranscriptionRequest {
  audioBase64: string;
  mimeType: string;
  language?: string;
}

export interface VoiceTranscriptionResponse {
  transcription: string;
  confidence: number;
  summary: string;
  keywords: string[];
}
