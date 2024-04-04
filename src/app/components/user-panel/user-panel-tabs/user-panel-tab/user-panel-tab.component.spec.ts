import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelTabComponent } from './user-panel-tab.component';

describe('UserPanelTabComponent', () => {
  let component: UserPanelTabComponent;
  let fixture: ComponentFixture<UserPanelTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPanelTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPanelTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
