import { TypeListCommentsShema } from '@/types/task.type';
import React from 'react';

import { formatDateUtils } from '@/utils/utils';
import styles from './ListComments.module.scss';

interface PropsListComments {
  comments: TypeListCommentsShema;
}
const ListComments = ({ comments }: PropsListComments) => {
  console.log(!!comments.length);

  return (
    <div>
      {!!comments.length &&
        comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <div className={styles.commentTop}>
              <div className={styles.commentRightBlock}>
                <img
                  className={styles.avatar}
                  src={
                    comment.user.avatar
                      ? `https://trainee-academy.devds.ru/${comment.user.avatar?.link}`
                      : '/default_user.png'
                  }
                  alt="Постановщик"
                />

                <div className={styles.userInfo}>
                  <div
                    className={styles.commentUserName}
                  >{`${comment.user.surname} ${comment.user.name}`}</div>
                  <div className={styles.commentUserDate}>
                    {formatDateUtils(comment.created_at)}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.commentBottom}>{comment.content}</div>
          </div>
        ))}
    </div>
  );
};
export default ListComments;
