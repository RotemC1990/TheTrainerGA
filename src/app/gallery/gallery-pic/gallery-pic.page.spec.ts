import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryPicPage } from './gallery-pic.page';

describe('GalleryPicPage', () => {
  let component: GalleryPicPage;
  let fixture: ComponentFixture<GalleryPicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryPicPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryPicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
