import { WordTokenizer } from 'natural';
import { removeStopwords } from 'stopword';
import { PorterStemmer } from 'natural';

const tokenizer = new WordTokenizer();

export const tokenize = (text: string): string[] => {
  return tokenizer.tokenize(text.toLowerCase());
};

export const removeStopwordsFromTokens = (tokens: string[]): string[] => {
  return removeStopwords(tokens);
};

export const stemTokens = (tokens: string[]): string[] => {
  return tokens.map(token => PorterStemmer.stem(token));
};

export const processText = (text: string): string[] => {
    const tokens = tokenize(text);
    const withoutStopwords = removeStopwordsFromTokens(tokens);
    const stemmed = stemTokens(withoutStopwords);
    return stemmed;
}
