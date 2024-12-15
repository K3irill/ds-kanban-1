import React, { useState } from 'react';
import { PossibleTaskNextStages, TypeStage } from '@/types/task.type';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';

import styles from './Select.module.scss';

interface PropsSelectUi {
  possibleTaskNextStages: PossibleTaskNextStages;
  stage: TypeStage;
}

const Select: React.FC<PropsSelectUi> = ({ possibleTaskNextStages, stage }) => {
  const [selectedPerson, setSelectedPerson] = useState(stage.name);
  const onChange = (valueSelect: string) => {
    setSelectedPerson(valueSelect);
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
