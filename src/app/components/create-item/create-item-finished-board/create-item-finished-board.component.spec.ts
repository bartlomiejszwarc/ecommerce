import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItemFinishedBoardComponent } from './create-item-finished-board.component';

describe('CreateItemFinishedBoardComponent', () => {
  let component: CreateItemFinishedBoardComponent;
  let fixture: ComponentFixture<CreateItemFinishedBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateItemFinishedBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateItemFinishedBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
