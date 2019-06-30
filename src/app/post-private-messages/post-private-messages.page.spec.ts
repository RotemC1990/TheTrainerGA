import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPrivateMessagesPage } from './post-private-messages.page';

describe('PostPrivateMessagesPage', () => {
  let component: PostPrivateMessagesPage;
  let fixture: ComponentFixture<PostPrivateMessagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPrivateMessagesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPrivateMessagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
