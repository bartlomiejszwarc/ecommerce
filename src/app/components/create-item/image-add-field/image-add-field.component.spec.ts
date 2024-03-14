import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAddFieldComponent } from './image-add-field.component';

describe('ImageAddFieldComponent', () => {
  let component: ImageAddFieldComponent;
  let fixture: ComponentFixture<ImageAddFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageAddFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageAddFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
