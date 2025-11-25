declare interface IArticleCommentsResponse {
  articleSlug: string;
  articleTitle: string;
  commentsList: CommentDTO[];
}