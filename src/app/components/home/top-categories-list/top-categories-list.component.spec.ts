import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCategoriesListComponent } from './top-categories-list.component';

describe('TopCategoriesListComponent', () => {
  let component: TopCategoriesListComponent;
  let fixture: ComponentFixture<TopCategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopCategoriesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
