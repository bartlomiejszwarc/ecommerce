import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailsImagesComponent } from './item-details-images.component';

describe('ItemDetailsImagesComponent', () => {
  let component: ItemDetailsImagesComponent;
  let fixture: ComponentFixture<ItemDetailsImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDetailsImagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemDetailsImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
