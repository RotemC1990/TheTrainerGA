import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineePage } from './trainee.page';

describe('TraineePage', () => {
  let component: TraineePage;
  let fixture: ComponentFixture<TraineePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
