import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDescriptionCardTagComponent } from './item-description-card-tag.component';

describe('ItemDescriptionCardTagComponent', () => {
  let component: ItemDescriptionCardTagComponent;
  let fixture: ComponentFixture<ItemDescriptionCardTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDescriptionCardTagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemDescriptionCardTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
