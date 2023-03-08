import { Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { NewsItemType } from '../../types/NewsItemType';
import { getDataString, getTimeDif } from '../../utils/getTime';

interface NewsStoryPropsItem {
  props: NewsItemType | null;
  children?: React.ReactChild | React.ReactNode;
  handleUpdate: () => void;
}

const NewsStoryItem = ({ props, handleUpdate }: NewsStoryPropsItem) => {
  const timeAgo = getTimeDif(props?.time as number);
  const timeData = getDataString(props?.time as number);

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        {props?.deleted && (
          <Typography gutterBottom variant="h5" component="div">
            DELETED
          </Typography>
        )}

        {!props?.deleted && (
          <div>
            <Typography variant="h6">
              {
                <a href={props?.url} target="_blank">
                  {props?.title}
                </a>
              }
            </Typography>
            <div>
              <Typography component="span">
                {props && props?.score > 1
                  ? `${props?.score} points | `
                  : `${props?.score} point | `}
              </Typography>
              <Typography component="span">{`by ${props?.by} | `}</Typography>
              <Typography component="span">{`${timeData} | ${timeAgo} | `}</Typography>
              <Typography component="span">
                {props?.descendants === 1 ? `1 comment` : `${props?.descendants} comments`}
              </Typography>
            </div>
          </div>
        )}
        <Button
          onClick={handleUpdate}
          color="inherit"
          variant="outlined"
          sx={{ mt: '1rem' }}
          size="small">
          UPDATE COMMENTS
        </Button>
      </CardContent>
    </Card>
  );
};

export default NewsStoryItem;
