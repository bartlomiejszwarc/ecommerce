import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastVisitedProductCardComponent } from './last-visited-product-card.component';

describe('LastVisitedProductCardComponent', () => {
  let component: LastVisitedProductCardComponent;
  let fixture: ComponentFixture<LastVisitedProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastVisitedProductCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LastVisitedProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
