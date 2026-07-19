import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CfpService } from '../cfp.service';
import { SpeakerDTO } from '@cfp-platform/shared-types';

@Component({
  selector: 'app-cfp-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cfp-dashboard.component.html',
  styleUrl: './cfp-dashboard.component.css',
})
export class CfpDashboardComponent implements OnInit {
  private cfpService = inject(CfpService);
  private router = inject(Router);

  // Writable Signal for submissions state
  submissions = signal<SpeakerDTO[]>([]);

  // State signals for request flow
  isLoading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadSubmissions();
  }

  loadSubmissions(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.cfpService.getCfps().subscribe({
      next: (data) => {
        this.submissions.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.error.set(
          err.message || 'Failed to load submissions. Please try again.'
        );
      },
    });
  }

  navigateToForm(): void {
    this.router.navigate(['/cfp']);
  }
}
