import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageSettingsComponent } from './account-page-settings.component';

describe('AccountPageSettingsComponent', () => {
  let component: AccountPageSettingsComponent;
  let fixture: ComponentFixture<AccountPageSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountPageSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountPageSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
