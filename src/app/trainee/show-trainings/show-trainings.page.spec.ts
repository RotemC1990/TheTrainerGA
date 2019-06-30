import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTrainingsPage } from './show-trainings.page';

describe('ShowTrainingsPage', () => {
  let component: ShowTrainingsPage;
  let fixture: ComponentFixture<ShowTrainingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTrainingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTrainingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
