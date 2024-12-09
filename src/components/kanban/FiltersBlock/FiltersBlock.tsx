import cn from 'classnames';
import CustomCombobox from '@/components/ui/CustomCombobox/CustomCombobox';
import DateInput from '@/components/ui/DateInput/DateInput';
import Input from '@/components/ui/Input/Input';
import styles from './FiltersBlock.module.scss';

const FiltersBlock = ({
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
}) => (
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
          displayValue={(person) => person?.name || ''}
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
          displayValue={(type) => type?.name || ''}
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
          displayValue={(component) => component?.name || ''}
          placeholder="Компонент"
        />
      </div>
    </div>

    <div className={cn(styles['project-kanban__calendars'])}>
      <DateInput
        label="Дата начала"
        selectedDate={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholder="Выберите дату начала"
      />
      <DateInput
        label="Дата окончания"
        selectedDate={endDate}
        onChange={(date) => setEndDate(date)}
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
