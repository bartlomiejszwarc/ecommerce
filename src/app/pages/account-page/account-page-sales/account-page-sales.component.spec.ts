import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageSalesComponent } from './account-page-sales.component';

describe('AccountPageSalesComponent', () => {
  let component: AccountPageSalesComponent;
  let fixture: ComponentFixture<AccountPageSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountPageSalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountPageSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
