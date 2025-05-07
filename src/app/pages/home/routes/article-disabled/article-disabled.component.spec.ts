import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDisabledComponent } from './article-disabled.component';

describe('ArticleDisabledComponent', () => {
  let component: ArticleDisabledComponent;
  let fixture: ComponentFixture<ArticleDisabledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleDisabledComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleDisabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
