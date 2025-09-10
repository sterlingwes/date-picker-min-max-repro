import RNDateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useEffect, useState, type ComponentProps } from 'react';
import { View } from 'react-native';

type DateRangeOptions = Pick<
  Partial<ComponentProps<typeof RNDateTimePicker>>,
  'minimumDate' | 'maximumDate'
>;

interface DatePickerProps {
  minimumDate?: Date;
  maximumDate?: Date;
  deferredMaxDate?: Date;
}

export const DatePicker = ({
  minimumDate,
  maximumDate,
  deferredMaxDate,
}: DatePickerProps) => {
  const [minDate] = useState<Date | undefined>(minimumDate);
  const [maxDate, setMaxDate] = useState<Date | undefined>(maximumDate);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (deferredMaxDate) {
      setMaxDate(deferredMaxDate);
    }
  }, [deferredMaxDate]);

  const onDateChanged = (_: DateTimePickerEvent, newDate?: Date) => {
    if (!newDate) {
      return;
    }
    setSelectedDate(newDate);
  };

  const getDateRangeOptions = (): DateRangeOptions => {
    return {
      minimumDate: minDate,
      maximumDate: maxDate,
    };
  };

  return (
    <View
      style={{ minHeight: 300, justifyContent: 'center', alignItems: 'center' }}
    >
      <RNDateTimePicker
        testID="date-time-picker"
        mode="date"
        display="inline"
        value={selectedDate}
        onChange={onDateChanged}
        {...getDateRangeOptions()}
      />
    </View>
  );
};
