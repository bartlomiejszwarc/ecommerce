import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryContactCardComponent } from './summary-contact-card.component';

describe('SummaryContactCardComponent', () => {
  let component: SummaryContactCardComponent;
  let fixture: ComponentFixture<SummaryContactCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryContactCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummaryContactCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
