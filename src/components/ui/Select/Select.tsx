import React, { useState } from 'react';
import { PossibleTaskNextStages, TypeStage } from '@/types/task.type';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';

import { useMutation } from '@tanstack/react-query';
import TaskService from '@/services/task.service';
import styles from './Select.module.scss';

interface PropsSelectUi {
  possibleTaskNextStages: PossibleTaskNextStages;
  stage: TypeStage;
  task: any;
}

const Select: React.FC<PropsSelectUi> = ({ possibleTaskNextStages, stage, task }) => {
  const [selectedPerson, setSelectedPerson] = useState(stage.name);

  const { mutate: mutatePostCommit } = useMutation({
    mutationKey: ['pathTask'],
    mutationFn: () =>
      TaskService.patchTask('6', {
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
      }),
    onSuccess: () => {},
    onError: (error) => {
      const err = error as AxiosError;
    },
  });

  const onChange = (valueSelect: string) => {
    setSelectedPerson(valueSelect);
    mutatePostCommit();
  };

  return (
    <Listbox value={selectedPerson} onChange={(valueSelect) => onChange(valueSelect)}>
      <ListboxButton className={styles.select}>{selectedPerson}</ListboxButton>
      <ListboxOptions className={styles.listOptions} anchor="bottom">
        {possibleTaskNextStages.map((it) => (
          <ListboxOption className={styles.option} key={it.id} value={it.name}>
            {it.name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};

export default Select;
