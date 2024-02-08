import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarFieldComponent } from './navbar-field.component';

describe('NavbarFieldComponent', () => {
  let component: NavbarFieldComponent;
  let fixture: ComponentFixture<NavbarFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
