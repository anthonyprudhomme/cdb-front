import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerUpdateComponent } from './computer-update.component';

describe('ComputerUpdateComponent', () => {
  let component: ComputerUpdateComponent;
  let fixture: ComponentFixture<ComputerUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
