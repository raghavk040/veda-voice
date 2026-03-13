import { Component, OnInit } from '@angular/core';
import { HealthRecordService } from '../../services/health-record.service';
import { HealthRecord } from '../../models/health-record.model';

@Component({
  selector: 'app-health-record',
  standalone: true,
  template: `
    <div class="health-records">
      <h2>Health Records</h2>
      @if (records.length === 0) {
        <p class="empty-state">No health records found.</p>
      } @else {
        <ul class="record-list">
          @for (record of records; track record.id) {
            <li class="record-item">
              <span class="record-type badge">{{ record.recordType }}</span>
              <span class="record-title">{{ record.title }}</span>
              <span class="record-date">{{ record.createdAt | date:'shortDate' }}</span>
            </li>
          }
        </ul>
      }
    </div>
  `,
  styles: [
    `
      .health-records { max-width: 800px; margin: 0 auto; }
      .empty-state { color: var(--text-secondary); }
      .record-list { list-style: none; }
      .record-item {
        display: flex; align-items: center; gap: 12px;
        padding: 12px 16px; border: 1px solid var(--border-color);
        border-radius: 8px; margin-bottom: 8px;
        background: var(--surface-color);
      }
      .badge {
        font-size: 11px; font-weight: 600; padding: 2px 8px;
        background: var(--primary-color); color: #fff; border-radius: 12px;
      }
      .record-title { flex: 1; font-weight: 500; }
      .record-date { color: var(--text-secondary); font-size: 13px; }
    `,
  ],
})
export class HealthRecordComponent implements OnInit {
  records: HealthRecord[] = [];

  constructor(private healthRecordService: HealthRecordService) {}

  ngOnInit(): void {
    this.healthRecordService.getHealthRecords().subscribe((data) => {
      this.records = data;
    });
  }
}
