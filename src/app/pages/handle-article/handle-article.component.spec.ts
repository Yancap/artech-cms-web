import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleArticleComponent } from './handle-article.component';

describe('HandleArticleComponent', () => {
  let component: HandleArticleComponent;
  let fixture: ComponentFixture<HandleArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandleArticleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandleArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
