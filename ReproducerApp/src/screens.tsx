import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {
  createNavigatorFactory,
  type NavigatorTypeBagBase,
  type ParamListBase,
  type StackNavigationState,
  StackRouter,
  type StaticConfig,
  type TypedNavigator,
  useNavigationBuilder,
} from '@react-navigation/native';
import {
  NativeStackView,
  type NativeStackNavigationEventMap,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackNavigatorProps,
} from '@react-navigation/native-stack';
import { Button, Platform, Text, View } from 'react-native';
import { DatePickerButton } from './DatePickerButton';
import { DatePicker } from './DatePicker';

const ProtoNavigator = ({
  initialRouteName,
  children,
  screenOptions,
  ...rest
}: NativeStackNavigatorProps) => {
  const { state, descriptors, navigation, NavigationContent, describe } =
    useNavigationBuilder<
      StackNavigationState<ParamListBase>,
      any,
      any,
      NativeStackNavigationOptions,
      NativeStackNavigationEventMap
    >(StackRouter, {
      initialRouteName,
      children,
      screenOptions: {
        ...screenOptions,
        animation: (Platform.OS === 'ios'
          ? 'default'
          : 'slide_from_right') as NativeStackNavigationOptions['animation'],
      },
    });

  return (
    <NavigationContent>
      <NativeStackView
        {...rest}
        state={state}
        navigation={navigation}
        descriptors={descriptors}
        describe={describe}
      />
    </NavigationContent>
  );
};

const createNavigator = <
  const ParamList extends ParamListBase,
  const NavigatorID extends string | undefined = undefined,
  const TypeBag extends NavigatorTypeBagBase = {
    ParamList: ParamList;
    NavigatorID: NavigatorID;
    State: StackNavigationState<ParamList>;
    ScreenOptions: NativeStackNavigationOptions;
    EventMap: NativeStackNavigationEventMap;
    NavigationList: {
      [RouteName in keyof ParamList]: NativeStackNavigationProp<
        ParamList,
        RouteName,
        NavigatorID
      >;
    };
    Navigator: typeof ProtoNavigator;
  },
  const Config extends StaticConfig<TypeBag> = StaticConfig<TypeBag>,
>(
  config?: Config,
): TypedNavigator<TypeBag, Config> => {
  return createNavigatorFactory(ProtoNavigator)(config);
};

const SchedulingNavigator = createNavigator<ParamListBase>();
const RootNavigator = createNavigator<ParamListBase>();

const HomeScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<ParamListBase>;
}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightpink',
      }}
    >
      <Text>Home</Text>
      <Button
        title="Go to Scheduling"
        onPress={() =>
          navigation.navigate('SchedulingNavigator', { screen: 'Scheduling' })
        }
      />
    </View>
  );
};

const today = new Date();
const lowerDate = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 2,
);
const higherDate = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() + 2,
);

const Spacer = () => <View style={{ height: 16 }} />;

const SchedulingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgreen',
      }}
    >
      <Text>Date Picker Crash Reproducer</Text>
      <Spacer />
      <Text>Lower Date: {lowerDate.toLocaleDateString()}</Text>
      <Text>Higher Date: {higherDate.toLocaleDateString()}</Text>
      <Spacer />
      <DatePickerButton label="Open Date Picker w/ deferred min > max scenario (Crashes)">
        <DatePicker minimumDate={higherDate} deferredMaxDate={lowerDate} />
      </DatePickerButton>

      <DatePickerButton label="Open Date Picker with no min or max date">
        <DatePicker />
      </DatePickerButton>

      <DatePickerButton label="Open Date Picker with just a min date">
        <DatePicker minimumDate={lowerDate} />
      </DatePickerButton>

      <DatePickerButton label="Open Date Picker with just a max date">
        <DatePicker maximumDate={higherDate} />
      </DatePickerButton>

      <DatePickerButton label="Open Date Picker with both min and max date (min < max)">
        <DatePicker minimumDate={lowerDate} maximumDate={higherDate} />
      </DatePickerButton>
    </View>
  );
};

const SchedulingNavigation = () => {
  return (
    <BottomSheetModalProvider>
      <SchedulingNavigator.Navigator>
        <SchedulingNavigator.Screen
          name="Scheduling"
          component={SchedulingScreen}
        />
      </SchedulingNavigator.Navigator>
    </BottomSheetModalProvider>
  );
};

export const RootNavigation = () => {
  return (
    <RootNavigator.Navigator initialRouteName="Home">
      <RootNavigator.Screen name="Home" component={HomeScreen} />
      <RootNavigator.Screen
        name="SchedulingNavigator"
        component={SchedulingNavigation}
      />
    </RootNavigator.Navigator>
  );
};
