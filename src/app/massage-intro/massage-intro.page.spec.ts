import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MassageIntroPage } from './massage-intro.page';

describe('MassageIntroPage', () => {
  let component: MassageIntroPage;
  let fixture: ComponentFixture<MassageIntroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MassageIntroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MassageIntroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
