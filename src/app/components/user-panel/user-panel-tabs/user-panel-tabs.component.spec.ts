import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelTabsComponent } from './user-panel-tabs.component';

describe('UserPanelTabsComponent', () => {
  let component: UserPanelTabsComponent;
  let fixture: ComponentFixture<UserPanelTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPanelTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPanelTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
