import React from 'react';
import Comment from './Comment';
import styles from './Comment.module.scss';

interface CommentsListProps {
  kids: number[];
}

const CommentsList = ({ kids }: CommentsListProps) => {
  return (
    <ul className={styles.root}>
      {kids.map((element) => (
        <Comment key={element} id={element} />
      ))}
    </ul>
  );
};

export default CommentsList;
