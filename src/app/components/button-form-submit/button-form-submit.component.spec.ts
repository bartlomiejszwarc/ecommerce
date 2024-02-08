import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFormSubmitComponent } from './button-form-submit.component';

describe('ButtonFormSubmitComponent', () => {
  let component: ButtonFormSubmitComponent;
  let fixture: ComponentFixture<ButtonFormSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonFormSubmitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonFormSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
