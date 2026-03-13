import { Component, signal } from '@angular/core';
import { VoiceService } from '../../services/voice.service';
import { HealthRecordService } from '../../services/health-record.service';

@Component({
  selector: 'app-voice-recorder',
  standalone: true,
  template: `
    <div class="voice-recorder">
      <h2>Voice Recorder</h2>
      <p class="subtitle">Record your symptoms and let AI analyze them</p>

      <div class="recorder-area">
        <button
          class="record-btn"
          [class.recording]="isRecording()"
          (click)="toggleRecording()"
        >
          {{ isRecording() ? '⏹ Stop Recording' : '🎙 Start Recording' }}
        </button>

        @if (transcription()) {
          <div class="transcription-result">
            <h3>Transcription</h3>
            <p>{{ transcription() }}</p>
          </div>
        }

        @if (aiAnalysis()) {
          <div class="ai-result">
            <h3>AI Analysis</h3>
            <p>{{ aiAnalysis() }}</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .voice-recorder { max-width: 700px; margin: 0 auto; }
      .subtitle { color: var(--text-secondary); margin-bottom: 32px; }
      .recorder-area { text-align: center; }
      .record-btn {
        padding: 16px 32px; font-size: 18px; border-radius: 50px;
        background: var(--primary-color); color: #fff; border: none; cursor: pointer;
        &.recording { background: var(--danger-color); }
      }
      .transcription-result, .ai-result {
        margin-top: 24px; padding: 16px;
        background: var(--surface-color); border: 1px solid var(--border-color); border-radius: 8px;
        text-align: left;
      }
    `,
  ],
})
export class VoiceRecorderComponent {
  isRecording = signal(false);
  transcription = signal('');
  aiAnalysis = signal('');

  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  constructor(
    private voiceService: VoiceService,
    private healthRecordService: HealthRecordService
  ) {}

  toggleRecording(): void {
    if (this.isRecording()) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  private startRecording(): void {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.audioChunks = [];
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = (e) => this.audioChunks.push(e.data);
      this.mediaRecorder.onstop = () => this.processAudio(stream);
      this.mediaRecorder.start();
      this.isRecording.set(true);
    });
  }

  private stopRecording(): void {
    this.mediaRecorder?.stop();
    this.isRecording.set(false);
  }

  private processAudio(stream: MediaStream): void {
    stream.getTracks().forEach((t) => t.stop());
    const blob = new Blob(this.audioChunks, { type: 'audio/webm' });
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      this.voiceService
        .transcribeAudio({ audioBase64: base64, mimeType: 'audio/webm' })
        .subscribe((res) => {
          this.transcription.set(res.transcription);
          this.aiAnalysis.set(res.summary);
        });
    };
    reader.readAsDataURL(blob);
  }
}
