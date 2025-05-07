import { Component } from '@angular/core';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

const mockDadosTabela = [
  {
    title: 'Titulo do artigo sobre o Front-End e suas tecnologias',
    category: 'Front-end',
    comments: [
      {
        id: 1,
        text: 'Comentário 1',
        createdAt: '07/05/2025',
        userName: 'John Doe',
      },
    ],
  },
  {
    title: 'Titulo do artigo sobre o Front-End e suas tecnologias',
    category: 'Front-end',
    comments: [],
  },
  {
    title: 'Titulo do artigo sobre o Front-End e suas tecnologias',
    category: 'Front-end',
    comments: [
      {
        id: 1,
        text: 'Comentário 1',
        createdAt: '07/05/2025',
        userName: 'John Doe',
      },
      {
        id: 2,
        text: 'Comentário 2',
        createdAt: '07/05/2025',
        userName: 'John Doe',
      },
      {
        id: 3,
        text: 'Comentário 3',
        createdAt: '07/05/2025',
        userName: 'John Doe',
      },
      {
        id: 4,
        text: 'Comentário 4',
        createdAt: '07/05/2025',
        userName: 'John Doe',
      },
      {
        id: 5,
        text: 'Comentário 5',
        createdAt: '07/05/2025',
        userName: 'John Doe',
      },
      {
        id: 6,
        text: 'Comentário 6',
        createdAt: '07/05/2025',
        userName: 'John Doe',
      },
      {
        id: 7,
        text: 'Comentário 7',
        createdAt: '07/05/2025',
        userName: 'John Doe',
      },
    ],
  },
  {
    title: 'Titulo do artigo sobre o Front-End e suas tecnologias',
    category: 'Front-end',
    comments: [
      {
        id: 2,
        text: 'Comentário 2',
        createdAt: '07/05/2025',
        userName: 'John Doe',
      },
      {
        id: 2,
        text: 'Comentário 2',
        createdAt: '07/05/2025',
        userName: 'John Doe',
      },
    ],
  },
];
@Component({
  selector: 'app-manage-comments',
  standalone: true,
  imports: [ButtonComponent, PaginatorComponent],
  templateUrl: './manage-comments.component.html',
  styleUrl: './manage-comments.component.scss',
})
export class ManageCommentsComponent {
  public dataSource = mockDadosTabela;
  public dadosServer = mockDadosTabela;
  onChangePage(tableDataOutput: any[]) {
    this.dataSource = tableDataOutput;
  }
}
