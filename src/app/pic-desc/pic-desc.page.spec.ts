import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicDescPage } from './pic-desc.page';

describe('PicDescPage', () => {
  let component: PicDescPage;
  let fixture: ComponentFixture<PicDescPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicDescPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicDescPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
