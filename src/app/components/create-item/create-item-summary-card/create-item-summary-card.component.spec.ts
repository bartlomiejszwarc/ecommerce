import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItemSummaryCardComponent } from './create-item-summary-card.component';

describe('CreateItemSummaryCardComponent', () => {
  let component: CreateItemSummaryCardComponent;
  let fixture: ComponentFixture<CreateItemSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateItemSummaryCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateItemSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
