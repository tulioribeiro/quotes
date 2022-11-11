interface IQuote {
  quote: string;
  author: string;
}

interface IHome {
  quote: IQuote
}

export type { IQuote, IHome }
