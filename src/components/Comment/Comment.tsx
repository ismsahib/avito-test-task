import { Card, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useUnwrapAsyncThunk } from '../../hooks/useUnwrapAsyncThunk';
import { fetchCommentItem } from '../../store/commentSlice';
import { CommentType } from '../../types/CommentType';
import { getDataString, getTimeDif } from '../../utils/getTime';
import CommentsList from './CommentsList';
import styles from './Comment.module.scss';

interface CommentPropsType {
  id: number;
  children?: React.ReactChild | React.ReactNode;
}

const Comment = ({ id }: CommentPropsType) => {
  const [commentItem, setCommentItem] = React.useState<CommentType | null>(null);
  const [hide, setHide] = React.useState(true);

  const unwrap = useUnwrapAsyncThunk();

  const timeAgo = getTimeDif(commentItem?.time as number);
  const timeData = getDataString(commentItem?.time as number);

  React.useEffect(() => {
    unwrap(fetchCommentItem(id)).then((value) => setCommentItem(value));
  }, []);

  const handleView = () => {
    setHide(!hide);
  };

  return (
    <li key={id}>
      <div className={styles.mb}>
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
                <Divider sx={{ borderBottomWidth: 3 }} />
                <div>
                  <Typography
                    variant="body2"
                    component="span">{`by ${commentItem?.by} | `}</Typography>
                  <Typography
                    variant="body2"
                    component="span">{`${timeData} | ${timeAgo}`}</Typography>

                  {commentItem?.kids && (
                    <>
                      <Typography variant="body1" component="span">
                        {commentItem?.kids.length === 1
                          ? ' | 1 comment | '
                          : ` | ${commentItem?.kids.length} comments | `}
                      </Typography>
                      <span onClick={handleView} className={styles.button}>
                        {hide ? '⯈ view' : '⯆ hide'}
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {!hide && commentItem?.kids && <CommentsList kids={commentItem?.kids} />}
    </li>
  );
};

export default Comment;
