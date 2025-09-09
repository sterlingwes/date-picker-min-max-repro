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
import { useState } from 'react';
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

const SchedulingScreen = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgreen',
      }}
    >
      <Text>Scheduling</Text>
      <DatePickerButton
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
      >
        <DatePicker />
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
