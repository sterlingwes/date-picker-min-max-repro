import { Button, Platform, Text, View } from 'react-native';
import { BottomSheet } from './BottomSheet';
import { useCallback, useState, type ReactNode } from 'react';
import { FullWindowOverlay } from 'react-native-screens';

interface DatePickerButtonProps {
  label: string;
  children: React.ReactNode;
}

export const DatePickerButton = ({
  children,
  label,
}: DatePickerButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const renderOverlayContainer = useCallback(
    ({ children: overlayChildren }: { children?: ReactNode }) =>
      Platform.OS === 'ios' ? (
        <FullWindowOverlay>{overlayChildren}</FullWindowOverlay>
      ) : (
        <>{overlayChildren}</>
      ),
    [],
  );

  return (
    <>
      <Button title={label} onPress={() => setIsOpen(true)} />
      <BottomSheet.Modal
        enableDynamicSizing
        enablePanDownToClose
        isOpen={isOpen}
        onClose={onClose}
        containerComponent={renderOverlayContainer}
      >
        <View
          style={{
            padding: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>{label.replace('Open', '')}</Text>
        </View>
        {children}
      </BottomSheet.Modal>
    </>
  );
};
