import { Card, CardContent, CardActionArea, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NewsItemType } from '../../types/NewsItemType';
import { getTimeDif } from '../../utils/getTime';

interface NewsItemPropsType {
  props: NewsItemType;
  index: number;
  children?: React.ReactChild | React.ReactNode;
  sx?: any;
}

const NewsItem = ({ props, index }: NewsItemPropsType) => {
  const timeAgo = getTimeDif(props.time);
  const navigate = useNavigate();

  const handlerStoryNews = () => {
    navigate(`/news/${props.id}`);
  };

  return (
    <Card sx={{ width: '100%' }}>
      <CardActionArea onClick={handlerStoryNews}>
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
