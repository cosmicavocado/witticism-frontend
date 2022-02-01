import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptScreenComponent } from './prompt-screen.component';

describe('PromptScreenComponent', () => {
  let component: PromptScreenComponent;
  let fixture: ComponentFixture<PromptScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromptScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromptScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
