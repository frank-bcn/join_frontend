import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTaskComponent } from './open-task.component';

describe('OpenTaskComponent', () => {
  let component: OpenTaskComponent;
  let fixture: ComponentFixture<OpenTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpenTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
