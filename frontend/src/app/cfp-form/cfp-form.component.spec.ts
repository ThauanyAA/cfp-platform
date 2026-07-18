import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CfpFormComponent } from './cfp-form.component';
import { CfpService } from '../cfp.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { SpeakerDTO } from '@cfp-platform/shared-types';

describe('CfpFormComponent', () => {
  let component: CfpFormComponent;
  let fixture: ComponentFixture<CfpFormComponent>;
  let mockCfpService: {
    submitCfp: (
      payload: Omit<SpeakerDTO, 'id'>
    ) => ReturnType<CfpService['submitCfp']>;
  };

  beforeEach(async () => {
    mockCfpService = {
      submitCfp: (payload: Omit<SpeakerDTO, 'id'>) =>
        of({ id: '123', ...payload } as SpeakerDTO),
    };

    await TestBed.configureTestingModule({
      imports: [CfpFormComponent],
      providers: [{ provide: CfpService, useValue: mockCfpService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CfpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty fields and invalid state', () => {
    expect(component.name()).toBe('');
    expect(component.email()).toBe('');
    expect(component.talkTitle()).toBe('');
    expect(component.isGDE()).toBe(false);
    expect(component.isFormValid()).toBe(false);

    // Verify submit button is disabled
    const submitBtn = fixture.debugElement.query(By.css('.btn-submit'))
      .nativeElement;
    expect(submitBtn.disabled).toBe(true);
  });

  it('should display validation errors and enable submit button when valid', () => {
    // Before interaction, errors are not visible in UI even though signals have errors
    const nameErrorEl = fixture.debugElement.query(By.css('#name-error'));
    expect(nameErrorEl).toBeNull();

    // Fill in valid fields
    component.name.set('Jane Doe');
    component.email.set('jane@example.com');
    component.talkTitle.set('Introduction to Angular Signals');
    fixture.detectChanges();

    expect(component.isFormValid()).toBe(true);

    const submitBtn = fixture.debugElement.query(By.css('.btn-submit'))
      .nativeElement;
    expect(submitBtn.disabled).toBe(false);
  });

  it('should show validation messages when fields are touched and invalid', () => {
    // Touch fields and set invalid values
    component.nameTouched.set(true);
    component.emailTouched.set(true);
    component.email.set('invalid-email');
    component.talkTitleTouched.set(true);
    fixture.detectChanges();

    const nameErrorEl = fixture.debugElement.query(By.css('#name-error'));
    const emailErrorEl = fixture.debugElement.query(By.css('#email-error'));
    const talkTitleErrorEl = fixture.debugElement.query(
      By.css('#talkTitle-error')
    );

    expect(nameErrorEl).not.toBeNull();
    expect(nameErrorEl.nativeElement.textContent).toContain('Name is required.');

    expect(emailErrorEl).not.toBeNull();
    expect(emailErrorEl.nativeElement.textContent).toContain(
      'Please enter a valid email address.'
    );

    expect(talkTitleErrorEl).not.toBeNull();
    expect(talkTitleErrorEl.nativeElement.textContent).toContain(
      'Talk title is required.'
    );
  });

  it('should call CfpService submitCfp on valid submission and reset form on success', () => {
    let calledPayload: Omit<SpeakerDTO, 'id'> | null = null;
    mockCfpService.submitCfp = (payload: Omit<SpeakerDTO, 'id'>) => {
      calledPayload = payload;
      return of({ id: '123', ...payload } as SpeakerDTO);
    };

    component.name.set('Jane Doe');
    component.email.set('jane@example.com');
    component.talkTitle.set('Angular Signals deep dive');
    component.isGDE.set(true);
    fixture.detectChanges();

    component.onSubmit();
    fixture.detectChanges();

    expect(calledPayload).toEqual({
      name: 'Jane Doe',
      email: 'jane@example.com',
      talkTitle: 'Angular Signals deep dive',
      isGDE: true,
    });

    // Form fields should reset after success
    expect(component.name()).toBe('');
    expect(component.email()).toBe('');
    expect(component.talkTitle()).toBe('');
    expect(component.isGDE()).toBe(false);
    expect(component.submitSuccess()).toBe(true);
  });
});
