import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfpService } from '../cfp.service';

@Component({
  selector: 'app-cfp-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cfp-form.component.html',
  styleUrl: './cfp-form.component.css',
})
export class CfpFormComponent {
  private cfpService = inject(CfpService);

  // Writable Signals for form fields
  name = signal('');
  email = signal('');
  talkTitle = signal('');
  isGDE = signal(false);

  // Writable Signals for interaction states (touched)
  nameTouched = signal(false);
  emailTouched = signal(false);
  talkTitleTouched = signal(false);

  // Computed signals for validation errors
  nameError = computed(() => {
    const val = this.name().trim();
    if (!val) {
      return 'Name is required.';
    }
    return null;
  });

  emailError = computed(() => {
    const val = this.email().trim();
    if (!val) {
      return 'Email is required.';
    }
    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      return 'Please enter a valid email address.';
    }
    return null;
  });

  talkTitleError = computed(() => {
    const val = this.talkTitle().trim();
    if (!val) {
      return 'Talk title is required.';
    }
    return null;
  });

  // Computed signal for overall form validity
  isFormValid = computed(() => {
    return !this.nameError() && !this.emailError() && !this.talkTitleError();
  });

  // Signals for submission flow state
  isSubmitting = signal(false);
  submitSuccess = signal(false);
  submitError = signal<string | null>(null);

  // Mark all fields as touched (e.g. on submit attempt)
  markAllTouched() {
    this.nameTouched.set(true);
    this.emailTouched.set(true);
    this.talkTitleTouched.set(true);
  }

  onSubmit() {
    this.markAllTouched();
    if (!this.isFormValid()) {
      return;
    }

    this.isSubmitting.set(true);
    this.submitSuccess.set(false);
    this.submitError.set(null);

    const payload = {
      name: this.name().trim(),
      email: this.email().trim(),
      talkTitle: this.talkTitle().trim(),
      isGDE: this.isGDE(),
    };

    this.cfpService.submitCfp(payload).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.submitSuccess.set(true);
        // Reset form
        this.name.set('');
        this.email.set('');
        this.talkTitle.set('');
        this.isGDE.set(false);
        // Reset touched states
        this.nameTouched.set(false);
        this.emailTouched.set(false);
        this.talkTitleTouched.set(false);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.submitError.set(
          err.message || 'An error occurred during submission. Please try again.'
        );
      },
    });
  }
}
