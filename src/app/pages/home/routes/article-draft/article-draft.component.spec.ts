import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDraftComponent } from './article-draft.component';

describe('ArticleDraftComponent', () => {
  let component: ArticleDraftComponent;
  let fixture: ComponentFixture<ArticleDraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleDraftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
