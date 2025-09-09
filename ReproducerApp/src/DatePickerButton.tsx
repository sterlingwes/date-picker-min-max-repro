import { Button, Platform } from 'react-native';
import { BottomSheet } from './BottomSheet';
import { useCallback, useState, type ReactNode } from 'react';
import { FullWindowOverlay } from 'react-native-screens';

interface DatePickerButtonProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const DatePickerButton = ({ children }: DatePickerButtonProps) => {
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
      <Button title="Open Date Picker" onPress={() => setIsOpen(true)} />
      <BottomSheet.Modal
        enableDynamicSizing
        enablePanDownToClose
        isOpen={isOpen}
        onClose={onClose}
        containerComponent={renderOverlayContainer}
      >
        <BottomSheet.SafeAreaView>{children}</BottomSheet.SafeAreaView>
      </BottomSheet.Modal>
    </>
  );
};
