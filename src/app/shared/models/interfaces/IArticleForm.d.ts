declare interface ArticleFormDTO {
  title: string;
  subtitle: string;
  text: string;
  imageBlob: string;
  currentState: string;
  category: string;
  tags: string[];
  credits: { name: string; link: string }[];
}
