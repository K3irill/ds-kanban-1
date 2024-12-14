import React, { useState } from 'react';
import { PossibleTaskNextStages, TypeStage } from '@/types/task.type';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';

import { useMutation } from '@tanstack/react-query';
import TaskService from '@/services/task.service';
import styles from './Select.module.scss';

interface PropsSelectUi {
  possibleTaskNextStages: PossibleTaskNextStages;
  stage: TypeStage;
}

const SelectUi: React.FC<PropsSelectUi> = ({ possibleTaskNextStages, stage }) => {
  const [selectedPerson, setSelectedPerson] = useState(stage.name);

  const { mutate: mutatePostCommit } = useMutation({
    mutationKey: ['pathTask'],
    mutationFn: () =>
      TaskService.patchTask('6', {
        name: 'string',
        description: 'string',
        stage_id: 0,
        task_type_id: 0,
        component_id: 0,
        priority_id: 0,
        block_id: 0,
        release_id: 0,
        related_id: 0,
        epic_id: 0,
        estimate_cost: 0,
        estimate_worker: 0,
        layout_link: 'string',
        markup_link: 'string',
        dev_link: 'string',
        executors: [0],
        begin: '2022-11-30T08:48:00.000000Z',
        end: '2022-12-31T16:48:00.000000Z',
        date_start: '01.01.2024',
        date_end: '31.12.2024',
      }),
    onSuccess: () => {},
    onError: (error) => {
      const err = error as AxiosError;
    },
  });

  const onChange = (valueSelect: string) => {
    debugger;
    setSelectedPerson(valueSelect);
    mutatePostCommit();
  };

  console.log(possibleTaskNextStages);

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

export default SelectUi;
