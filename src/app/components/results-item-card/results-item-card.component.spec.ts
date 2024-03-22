import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsItemCardComponent } from './results-item-card.component';

describe('ResultsItemCardComponent', () => {
  let component: ResultsItemCardComponent;
  let fixture: ComponentFixture<ResultsItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsItemCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultsItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
