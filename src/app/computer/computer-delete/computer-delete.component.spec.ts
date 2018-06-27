import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerDeleteComponent } from './computer-delete.component';

describe('ComputerDeleteComponent', () => {
  let component: ComputerDeleteComponent;
  let fixture: ComponentFixture<ComputerDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
