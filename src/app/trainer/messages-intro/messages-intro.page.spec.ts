import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesIntroPage } from './messages-intro.page';

describe('MessagesIntroPage', () => {
  let component: MessagesIntroPage;
  let fixture: ComponentFixture<MessagesIntroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesIntroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesIntroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
