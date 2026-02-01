export interface TextSpan {
  text: string;
  className?: string;
}

export interface TextContent {
  type: 'text' | 'span';
  content: string | TextSpan[];
}

export interface ImageContent {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export interface AboutContent {
  heading: string;
  headingId?: string;
  image: ImageContent;
  paragraphs: TextContent[];
}
