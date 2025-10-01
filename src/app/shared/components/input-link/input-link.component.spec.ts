import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputLinkComponent } from './input-link.component';

describe('InputLinkComponent', () => {
  let component: InputLinkComponent;
  let fixture: ComponentFixture<InputLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
