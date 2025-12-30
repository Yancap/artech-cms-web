import { ArticleState } from '../enums/article-state.enums';

declare interface ArticleFormDTO {
  title: string;
  subtitle: string;
  text: string;
  imageBlob: string;
  imageUrl: string;
  currentState: ArticleState;
  category: string;
  tags: string[];
  credits: { name: string; link: string }[];
}
