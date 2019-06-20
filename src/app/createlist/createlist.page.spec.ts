import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatelistPage } from './createlist.page';

describe('CreatelistPage', () => {
  let component: CreatelistPage;
  let fixture: ComponentFixture<CreatelistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatelistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatelistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
