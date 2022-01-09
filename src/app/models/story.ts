import { Comment } from './comment';

export interface Story {
  id: number;
  category: string;
  section: string;
  title: string;
  abstract: string;
  byline: string;
  url: string;
  published_date: string;
  multimedia: [
    {
      url: string;
      type: string;
      caption: string;
    }
  ];
  comments: Comment[];
}
