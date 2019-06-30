import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateMessagesChatPage } from './private-messages-chat.page';

describe('PrivateMessagesChatPage', () => {
  let component: PrivateMessagesChatPage;
  let fixture: ComponentFixture<PrivateMessagesChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateMessagesChatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateMessagesChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
