declare interface IArticleResponse {
  articlesList: ArticleDTO[];
}

declare interface IArticleForTable {
  slug: string;
  title: string;
  createdAt: string;
  [key: string]: string;
}

declare interface ArticleDTO {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  text: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  currentState: ArticleState;
  author: GetAuthorDTO;
  category: string;
  tags: string[];
  credits: CreditDTO[];
  comments: CommentDTO[];
}

declare interface CreditDTO {
  name: string;
  link: string;
}

declare interface CommentDTO {
  id: number;
  text: string;
  createdAt: string;
  userName: string;
}

declare interface GetAuthorDTO {
  name: string;
  email: string;
  urlAvatar: string;
  quantitiesArticles: number;
}
