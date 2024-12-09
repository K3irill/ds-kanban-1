import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import cn from 'classnames';
import styles from './DateInput.module.scss';
//-------------------------------------------------

export default function DateInput({
  selectedDate,
  onChange,
  selectsStart,
  selectsEnd,
  startDate,
  endDate,
  minDate,
  placeholder,
}) {
  return (
    <div className={cn(styles['calendar-input'])}>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        selectsStart={selectsStart}
        selectsEnd={selectsEnd}
        startDate={startDate}
        endDate={endDate}
        minDate={minDate}
        dateFormat="yyyy-MM-dd"
        placeholderText={placeholder}
      />
    </div>
  );
}
