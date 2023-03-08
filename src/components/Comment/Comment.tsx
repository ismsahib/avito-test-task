import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { useUnwrapAsyncThunk } from '../../hooks/useUnwrapAsyncThunk';
import { fetchCommentItem } from '../../store/commentSlice';
import { CommentType } from '../../types/CommentType';
import { getDataString, getTimeDif } from '../../utils/getTime';
import styles from './Comment.module.scss';

interface CommentPropsType {
  id: number;
  children?: React.ReactChild | React.ReactNode;
}

const Comment = ({ id }: CommentPropsType) => {
  const [commentItem, setCommentItem] = React.useState<CommentType | null>(null);
  const unwrap = useUnwrapAsyncThunk();

  const timeAgo = getTimeDif(commentItem?.time as number);
  const timeData = getDataString(commentItem?.time as number);

  React.useEffect(() => {
    unwrap(fetchCommentItem(id)).then((value) => setCommentItem(value));
  }, []);

  return (
    <li className={styles.root} key={id}>
      <Card sx={{ width: '100%' }}>
        <CardContent>
          {commentItem?.deleted && (
            <Typography gutterBottom variant="h5" component="div">
              DELETED
            </Typography>
          )}

          {!commentItem?.deleted && (
            <div>
              <Typography variant="body1">{commentItem?.text}</Typography>
              <div>
                <Typography
                  variant="body2"
                  component="span">{`by ${commentItem?.by} | `}</Typography>
                <Typography
                  variant="body2"
                  component="span">{`${timeData} | ${timeAgo} | `}</Typography>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </li>
  );
};

export default Comment;
