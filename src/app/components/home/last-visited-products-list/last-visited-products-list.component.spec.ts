import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastVisitedProductsListComponent } from './last-visited-products-list.component';

describe('LastVisitedProductsListComponent', () => {
  let component: LastVisitedProductsListComponent;
  let fixture: ComponentFixture<LastVisitedProductsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastVisitedProductsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LastVisitedProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
