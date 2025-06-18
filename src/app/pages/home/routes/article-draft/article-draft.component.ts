import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { ArticleService } from '../../../../shared/services/article/article.service';
import { ArticleState } from '../../../../shared/models/enums/article-state.enums';
const mockDadosTabela = [
  {
    title: 'Titulo do artigo sobre o Front-End e suas tecnologias',
    category: 'Front-end',
    createdAt: 'Jan 01, 2023',
  },
  {
    title: 'Titulo do artigo sobre o Front-End e suas tecnologias',
    category: 'Front-end',
    createdAt: 'Jan 02, 2023',
  },
  {
    title: 'Titulo do artigo sobre o Front-End e suas tecnologias',
    category: 'Front-end',
    createdAt: 'Jan 03, 2023',
  },
  {
    title: 'Titulo do artigo sobre o Front-End e suas tecnologias',
    category: 'Front-end',
    createdAt: 'Jan 04, 2023',
  },
  {
    title: 'Titulo do artigo sobre o Front-End e suas tecnologias',
    category: 'Front-end',
    createdAt: 'Jan 05, 2023',
  },
];
@Component({
  selector: 'app-article-draft',
  standalone: true,
  imports: [ButtonComponent, PaginatorComponent],
  templateUrl: './article-draft.component.html',
  styleUrl: './article-draft.component.scss',
})
export class ArticleDraftComponent implements OnInit {
  public dataSource = mockDadosTabela;
  public dadosServer = mockDadosTabela;

  constructor(private articleService: ArticleService) {}
  ngOnInit(): void {
    this.articleService.getArticleByState(ArticleState.draft);
  }
  onChangePage(tableDataOutput: any[]) {
    this.dataSource = tableDataOutput;
  }
}
