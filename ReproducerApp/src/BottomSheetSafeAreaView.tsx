import { BottomSheetView } from '@gorhom/bottom-sheet';
import type { PropsWithChildren } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  additionalBottomPadding?: number;
  style?: StyleProp<ViewStyle>;
}

const BottomSheetSafeAreaView = ({
  children,
  additionalBottomPadding = 0,
  style,
  ...props
}: PropsWithChildren<Props>) => {
  const insets = useSafeAreaInsets();

  return (
    <BottomSheetView
      style={[
        { paddingBottom: insets.bottom + additionalBottomPadding },
        style,
      ]}
      {...props}
    >
      {children}
    </BottomSheetView>
  );
};

BottomSheetSafeAreaView.displayName = 'BottomSheetSafeAreaView';

export { BottomSheetSafeAreaView };
