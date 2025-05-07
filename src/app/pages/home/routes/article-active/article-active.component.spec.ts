import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleActiveComponent } from './article-active.component';

describe('ArticleActiveComponent', () => {
  let component: ArticleActiveComponent;
  let fixture: ComponentFixture<ArticleActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleActiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
