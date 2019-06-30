import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryIntroPage } from './gallery-intro.page';

describe('GalleryIntroPage', () => {
  let component: GalleryIntroPage;
  let fixture: ComponentFixture<GalleryIntroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryIntroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryIntroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
