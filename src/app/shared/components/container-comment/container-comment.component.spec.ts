import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerCommentComponent } from './container-comment.component';

describe('ContainerCommentComponent', () => {
  let component: ContainerCommentComponent;
  let fixture: ComponentFixture<ContainerCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
