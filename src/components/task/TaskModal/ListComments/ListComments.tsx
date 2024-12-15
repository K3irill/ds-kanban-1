import { TypeListCommentsShema } from '@/types/task.type';
import React from 'react';

import { formatDateUtils } from '@/utils/utils';
import { useMutation } from '@tanstack/react-query';
import TaskService from '@/services/task.service';

import ProjectService from '@/services/project.service';
import styles from './ListComments.module.scss';

interface PropsListComments {
  comments: TypeListCommentsShema;
  idTask: number;

  task: any;
}
const ListComments = ({ comments, idTask, task }: PropsListComments) => {
  console.log(!!comments.length);

  const { mutate: mutateDeleteCommit } = useMutation({
    mutationKey: ['deleteComment'],
    mutationFn: (id: number) => TaskService.deleteCommit(id),
    onSuccess: () => {
      ProjectService.updateTask(idTask, {
        name: task.name,
        description: task.description,
        stage_id: task.stage.id,
        task_type_id: task.task_type.id,
        component_id: task.component.id,
        priority_id: task.priority.id,
        block_id: null,
        release_id: null,
        related_id: null,
        epic_id: null,
        estimate_cost: null,
        estimate_worker: null,
        layout_link: null,
        markup_link: null,
        dev_link: null,
        executors: null,
        begin: task.begin,
        end: task.end,
        date_start: '01.01.2024',
        date_end: '31.12.2024',
      });
    },
  });
  return (
    <div>
      {!!comments.length &&
        comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <div className={styles.commentTop}>
              <div className={styles.commentLeftBlock}>
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
              <div className={styles.commentRightBlock}>
                <button
                  onClick={() => mutateDeleteCommit(comment.id)}
                  className={styles.commentBtn}
                  type="button"
                >
                  <svg viewBox="0 0 20 20" width="20" height="20">
                    <use href="/sprite.svg#delete" />
                  </svg>
                </button>
              </div>
            </div>
            <div className={styles.commentBottom}>{comment.content}</div>
          </div>
        ))}
    </div>
  );
};
export default ListComments;
