import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenEditTaskComponent } from './open-edit-task.component';

describe('OpenEditTaskComponent', () => {
  let component: OpenEditTaskComponent;
  let fixture: ComponentFixture<OpenEditTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenEditTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpenEditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
