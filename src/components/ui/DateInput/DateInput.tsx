import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import cn from 'classnames';
import styles from './DateInput.module.scss';

interface DateInputProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  selectsStart?: boolean;
  selectsEnd?: boolean;
  startDate: any;
  endDate: any;
  minDate?: any;
  placeholder: string;
}

const DateInput = ({
  selectedDate,
  onChange,
  selectsStart,
  selectsEnd = false,
  startDate,
  endDate,
  minDate = null,
  placeholder,
}: DateInputProps) => (
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

export default DateInput;
