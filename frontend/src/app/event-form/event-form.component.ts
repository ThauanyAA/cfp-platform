import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css',
})
export class EventFormComponent {
  private fb = inject(FormBuilder);
  private eventService = inject(EventService);

  eventForm = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    capacity: [null, [Validators.required, Validators.min(1)]],
    date: ['', Validators.required],
  });

  isSubmitting = signal(false);
  submitSuccess = signal(false);
  submitError = signal<string | null>(null);

  get nameControl() {
    return this.eventForm.get('name');
  }

  get addressControl() {
    return this.eventForm.get('address');
  }

  get capacityControl() {
    return this.eventForm.get('capacity');
  }

  get dateControl() {
    return this.eventForm.get('date');
  }

  onSubmit() {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.submitSuccess.set(false);
    this.submitError.set(null);

    const formValue = this.eventForm.value;
    const payload = {
      name: formValue.name!,
      address: formValue.address!,
      capacity: Number(formValue.capacity!),
      date: formValue.date!,
    };

    this.eventService.submitEvent(payload).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.submitSuccess.set(true);
        this.eventForm.reset();
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
