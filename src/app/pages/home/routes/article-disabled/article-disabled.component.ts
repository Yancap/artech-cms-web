import { Component } from '@angular/core';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
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
  selector: 'app-article-disabled',
  standalone: true,
  imports: [ButtonComponent, PaginatorComponent],
  templateUrl: './article-disabled.component.html',
  styleUrl: './article-disabled.component.scss',
})
export class ArticleDisabledComponent {
  public dataSource = mockDadosTabela;
  public dadosServer = mockDadosTabela;
  onChangePage(tableDataOutput: any[]) {
    this.dataSource = tableDataOutput;
  }
}
