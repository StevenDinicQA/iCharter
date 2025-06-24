export interface ImageFallbackProps {
  src?: string;
  fallbackSrc: string;
  alt: string;
  contain?: boolean;
  shouldDisplay?: boolean,
  [prop: string]: any;
}
