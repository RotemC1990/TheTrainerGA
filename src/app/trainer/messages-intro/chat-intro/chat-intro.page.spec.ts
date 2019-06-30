import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatIntroPage } from './chat-intro.page';

describe('ChatIntroPage', () => {
  let component: ChatIntroPage;
  let fixture: ComponentFixture<ChatIntroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatIntroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatIntroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
