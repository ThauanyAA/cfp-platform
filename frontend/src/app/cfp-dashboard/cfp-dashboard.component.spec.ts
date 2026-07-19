import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CfpDashboardComponent } from './cfp-dashboard.component';
import { CfpService } from '../cfp.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { SpeakerDTO } from '@cfp-platform/shared-types';

describe('CfpDashboardComponent', () => {
  let component: CfpDashboardComponent;
  let fixture: ComponentFixture<CfpDashboardComponent>;
  let mockCfpService: {
    getCfps: () => ReturnType<CfpService['getCfps']>;
  };
  let mockRouter: {
    navigate: (commands: any[]) => Promise<boolean>;
  };
  let navigateCalls: any[][];

  const sampleSubmissions: SpeakerDTO[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      talkTitle: 'NestJS and Signals',
      isGDE: false,
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      talkTitle: 'Advanced Angular 21',
      isGDE: true,
    },
  ];

  beforeEach(async () => {
    mockCfpService = {
      getCfps: () => of(sampleSubmissions),
    };

    navigateCalls = [];
    mockRouter = {
      navigate: (commands: any[]) => {
        navigateCalls.push(commands);
        return Promise.resolve(true);
      },
    };

    await TestBed.configureTestingModule({
      imports: [CfpDashboardComponent],
      providers: [
        { provide: CfpService, useValue: mockCfpService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CfpDashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    fixture.detectChanges(); // triggers ngOnInit
    expect(component).toBeTruthy();
  });

  it('should load submissions and update signal on init', () => {
    fixture.detectChanges(); // triggers ngOnInit

    expect(component.submissions()).toEqual(sampleSubmissions);
    expect(component.isLoading()).toBe(false);
    expect(component.error()).toBeNull();

    // Verify table rows are rendered
    const rows = fixture.debugElement.queryAll(By.css('.cfp-table tbody tr'));
    expect(rows.length).toBe(2);

    // Verify names
    const names = fixture.debugElement.queryAll(By.css('.speaker-name'));
    expect(names[0].nativeElement.textContent.trim()).toBe('John Doe');
    expect(names[1].nativeElement.textContent.trim()).toBe('Jane Smith');

    // Verify GDE badge rendering
    const gdeBadge = fixture.debugElement.query(By.css('.badge-gde'));
    expect(gdeBadge).not.toBeNull();
    expect(gdeBadge.nativeElement.textContent.trim()).toBe('GDE');

    const regularBadge = fixture.debugElement.query(By.css('.badge-regular'));
    expect(regularBadge).not.toBeNull();
    expect(regularBadge.nativeElement.textContent.trim()).toBe('Não');
  });

  it('should handle error when fetching submissions fails', () => {
    mockCfpService.getCfps = () => throwError(() => new Error('API Error'));
    fixture.detectChanges(); // triggers ngOnInit

    expect(component.submissions().length).toBe(0);
    expect(component.isLoading()).toBe(false);
    expect(component.error()).toBe('API Error');

    // Verify error alert is rendered in UI
    const alert = fixture.debugElement.query(By.css('.alert-danger'));
    expect(alert).not.toBeNull();
    expect(alert.nativeElement.textContent).toContain('API Error');
  });

  it('should navigate to form when navigateToForm is called', () => {
    fixture.detectChanges();
    component.navigateToForm();
    expect(navigateCalls).toContainEqual(['/cfp']);
  });
});
