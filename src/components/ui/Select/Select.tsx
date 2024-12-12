import { PossibleTaskNextStages, TypeStage } from '@/types/task.type';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import React, { useState } from 'react';
import { string } from 'zod';

interface PropsSelectUi {
  possibleTaskNextStages: PossibleTaskNextStages;
  stage: TypeStage;
}

const SelectUi: React.FC<PropsSelectUi> = ({ possibleTaskNextStages, stage }) => {
  const [selectedPerson, setSelectedPerson] = useState(stage.name);

  const onChange = (valueSelect: string) => {
    setSelectedPerson(valueSelect);
  };

  return (
    <Listbox value={selectedPerson} onChange={(valueSelect) => onChange(valueSelect)}>
      <ListboxButton>{selectedPerson}</ListboxButton>
      <ListboxOptions anchor="bottom">
        {possibleTaskNextStages.map((it) => (
          <ListboxOption key={it.id} value={it.name}>
            {it.name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};

export default SelectUi;
