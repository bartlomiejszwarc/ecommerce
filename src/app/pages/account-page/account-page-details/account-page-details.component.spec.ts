import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageDetailsComponent } from './account-page-details.component';

describe('AccountPageDetailsComponent', () => {
  let component: AccountPageDetailsComponent;
  let fixture: ComponentFixture<AccountPageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountPageDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountPageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
