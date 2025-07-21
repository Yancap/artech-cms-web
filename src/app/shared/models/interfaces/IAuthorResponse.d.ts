declare interface IAuthorResponse {
  authorsList: AuthorDTO[];
}

declare interface AuthorDTO {
  name: string;
  email: string;
  urlAvatar: string;
  quantitiesArticles: number;
}
