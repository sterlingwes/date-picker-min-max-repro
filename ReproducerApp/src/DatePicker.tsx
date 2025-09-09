import RNDateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useEffect, useState, type ComponentProps } from 'react';
import { View } from 'react-native';

type DateRangeOptions = Pick<
  Partial<ComponentProps<typeof RNDateTimePicker>>,
  'minimumDate' | 'maximumDate'
>;

export const DatePicker = () => {
  const [minDate] = useState<Date | undefined>(new Date('2025-09-09'));
  const [maxDate, setMaxDate] = useState<Date | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    setMaxDate(new Date('2025-08-09'));
  }, []);

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
    <View>
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
