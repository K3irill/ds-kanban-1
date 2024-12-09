import cn from 'classnames';
import CustomCombobox from '@/components/ui/CustomCombobox/CustomCombobox';
import DateInput from '@/components/ui/DateInput/DateInput';
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
  selectedPerson: Person | null;
  setSelectedPerson: (person: Person | null) => void;
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
  selectedPerson,
  setSelectedPerson,
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
        <label htmlFor="">
          <span>Название задачи</span>
        </label>
        <input
          value={taskNameValue}
          onChange={(e) => setTaskNameValue(e.target.value)}
          type="text"
          placeholder="Название задачи"
        />
      </div>

      <div className={cn(styles['project-kanban__input'])}>
        <CustomCombobox
          label="Выбрать пользователя"
          value={selectedPerson}
          onChange={setSelectedPerson}
          onQueryChange={setPeopleQuery}
          options={filteredPeople}
          displayValue={(person: Person) => person?.name || ''}
          placeholder="Выберите пользователя"
        />
      </div>

      <div className={cn(styles['project-kanban__input'])}>
        <CustomCombobox
          label="Выбрать тип"
          value={selectedType}
          onChange={setSelectedType}
          onQueryChange={setTypeQuery}
          options={filteredTypes}
          displayValue={(type: Type) => type?.name || ''}
          placeholder="Тип задачи"
        />
      </div>

      <div className={cn(styles['project-kanban__input'])}>
        <CustomCombobox
          label="Выбрать компонент"
          value={selectedComponent}
          onChange={setSelectedComponent}
          onQueryChange={setComponentQuery}
          options={filteredComponents}
          displayValue={(component: Component) => component?.name || ''}
          placeholder="Компонент"
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
