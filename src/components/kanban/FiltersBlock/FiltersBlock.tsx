import cn from 'classnames';
import CustomCombobox from '@/components/ui/CustomCombobox/CustomCombobox';
import DateInput from '@/components/ui/DateInput/DateInput';
import InputDefault from '@/components/ui/Input/InputDefault/InputDefault';
import styles from './FiltersBlock.module.scss';

type Person = { id: number; name: string };
type Type = { id: number; name: string };
type Component = { id: number; name: string };

interface FiltersBlockProps {
  taskNameValue: string;
  setTaskNameValue: (value: string) => void;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  selectedPersons: Person[] | null;
  setSelectedPersons: any;
  selectedType: Type | null;
  setSelectedType: (type: Type | null) => void;
  selectedComponent: Component | null;
  setSelectedComponent: (component: Component | null) => void;
  filteredPeople: Person[];
  setPeopleQuery: (query: string) => void;
  filteredTypes: Type[];
  setTypeQuery: (query: string) => void;
  filteredComponents: Component[];
  setComponentQuery: (query: string) => void;
}

const FiltersBlock: React.FC<FiltersBlockProps> = ({
  taskNameValue,
  setTaskNameValue,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedPersons,
  setSelectedPersons,
  selectedType,
  setSelectedType,
  selectedComponent,
  setSelectedComponent,
  filteredPeople,
  setPeopleQuery,
  filteredTypes,
  setTypeQuery,
  filteredComponents,
  setComponentQuery,
}: FiltersBlockProps) => (
  <div className={cn(styles['project-kanban__filters'])}>
    <div className={cn(styles['project-kanban__inputs'])}>
      <div className={cn(styles['project-kanban__input'])}>
        <InputDefault
          id="project-name"
          onChange={(e) => setTaskNameValue(e.target.value)}
          type="text"
          labelText="Название проекта"
          value={taskNameValue}
          onClear={() => setTaskNameValue('')}
          isClear
          placeholder="Введите название"
        />
      </div>

      <div className={cn(styles['project-kanban__input'])}>
        <CustomCombobox
          label="Исполнители"
          value={selectedPersons}
          onChange={setSelectedPersons}
          onQueryChange={setPeopleQuery}
          options={filteredPeople}
          displayValue={(person: any) => person.name}
          placeholder="Выберите исполнителей"
          isMulti
        />
      </div>

      <div className={cn(styles['project-kanban__input'])}>
        <CustomCombobox
          label="Выбрать тип"
          value={selectedType}
          onChange={setSelectedType}
          onQueryChange={setTypeQuery}
          displayValue={(type: any) => type?.name || ''}
          placeholder="Тип задачи"
          options={filteredTypes}
        />
      </div>

      <div className={cn(styles['project-kanban__input'])}>
        <CustomCombobox
          label="Компонент"
          value={selectedComponent}
          onChange={setSelectedComponent}
          onQueryChange={setComponentQuery}
          displayValue={(component: any) => component?.name || ''}
          placeholder="Компонент"
          options={filteredComponents}
        />
      </div>
    </div>

    <div className={cn(styles['project-kanban__calendars'])}>
      <DateInput
        selectedDate={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholder="Выберите дату начала"
      />
      <DateInput
        selectedDate={endDate}
        onChange={(date: Date | null) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholder="Выберите дату окончания"
      />
    </div>
  </div>
);

export default FiltersBlock;
