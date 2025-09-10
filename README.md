# date-picker-min-max-repro

`cd ReproducerApp && yarn && yarn ios`

Tap `Go to Scheduling` then the first button on the next screen to see the crash:

```
*** Terminating app due to uncaught exception 'NSGenericException', reason: 'Start date cannot be later in time than end date!'
*** First throw call stack:
(
	0   CoreFoundation                      0x00000001804c9690 __exceptionPreprocess + 172
	1   libobjc.A.dylib                     0x00000001800937cc objc_exception_throw + 72
	2   Foundation                          0x0000000180f55184 -[_NSConcreteDateInterval initWithStartDate:endDate:] + 396
	3   UIKitCore                           0x00000001850dfee0 -[_UIDatePickerCalendarView _reloadCalendarView] + 352
	4   UIKitCore                           0x00000001850dffa4 -[_UIDatePickerCalendarView _reload] + 48
	5   UIKitCore                           0x0000000185bfd72c -[UIDatePicker _installPickerView:updatingSize:] + 152
	6   UIKitCore                           0x0000000185bfd650 -[UIDatePicker _updatePickerViewIfNecessary] + 120
	7   ReproducerApp.debug.dylib           0x0000000107242670 -[RNDateTimePickerComponentView updatePropsForPicker:props:oldProps:
```
