import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPublicMessagesPage } from './post-public-messages.page';

describe('PostPublicMessagesPage', () => {
  let component: PostPublicMessagesPage;
  let fixture: ComponentFixture<PostPublicMessagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPublicMessagesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPublicMessagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
