import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUserDataComponent } from './change-user-data.component';

describe('ChangeUserDataComponent', () => {
  let component: ChangeUserDataComponent;
  let fixture: ComponentFixture<ChangeUserDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeUserDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
