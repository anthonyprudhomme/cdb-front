import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationFilterComponent } from './authentication-filter.component';

describe('AuthenticationFilterComponent', () => {
  let component: AuthenticationFilterComponent;
  let fixture: ComponentFixture<AuthenticationFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticationFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
