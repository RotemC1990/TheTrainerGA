import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserPage } from './delete-user.page';

describe('DeleteUserPage', () => {
  let component: DeleteUserPage;
  let fixture: ComponentFixture<DeleteUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
