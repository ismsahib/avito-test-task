import React from 'react';
import { NewsItemType } from '../types/NewsItemType';

const NewsItem: React.FC<NewsItemType> = (props) => {
  return <div key={props.id}>NewsItem</div>;
};

export default NewsItem;
