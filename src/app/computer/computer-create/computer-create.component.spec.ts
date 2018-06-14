import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerCreateComponent } from './computer-create.component';

describe('ComputerCreateComponent', () => {
  let component: ComputerCreateComponent;
  let fixture: ComponentFixture<ComputerCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
