import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAddTaskBoardComponent } from './open-add-task-board.component';

describe('OpenAddTaskBoardComponent', () => {
  let component: OpenAddTaskBoardComponent;
  let fixture: ComponentFixture<OpenAddTaskBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenAddTaskBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpenAddTaskBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
