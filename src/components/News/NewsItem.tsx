import { Card, CardContent, CardActionArea, Typography } from '@mui/material';
import React from 'react';
import { NewsItemType } from '../../types/NewsItemType';
import { getTimeDif } from '../../utils/getTime';
import styles from './NewsList.module.scss';

interface NewsItemPropsType {
  props: NewsItemType;
  index: number;
  children?: React.ReactChild | React.ReactNode;
  sx?: any;
}

const NewsItem = ({ props, index }: NewsItemPropsType) => {
  const timeAgo = getTimeDif(props.time);

  return (
    <Card sx={{ width: '100%' }}>
      <CardActionArea>
        <CardContent>
          {props.deleted && (
            <Typography gutterBottom variant="h5" component="div">
              DELETED
            </Typography>
          )}
          {!props.deleted && (
            <div>
              <Typography variant="h6">{`${index + 1}. ` + props.title}</Typography>
              <div>
                <Typography component="span">
                  {props.score > 1 ? `${props.score} points | ` : `${props.score} point | `}
                </Typography>
                <Typography component="span">{`by ${props.by} | `}</Typography>
                <Typography component="span">{timeAgo}</Typography>
              </div>
            </div>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NewsItem;
