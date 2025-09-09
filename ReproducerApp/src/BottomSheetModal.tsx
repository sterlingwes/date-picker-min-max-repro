import type { BottomSheetModalProps } from '@gorhom/bottom-sheet';
import { BottomSheetModal as GorhomBottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { useReducedMotion } from 'react-native-reanimated';

type Props = BottomSheetModalProps & {
  onClose: () => void;
  isOpen: boolean;
  children: ReactNode;
};

const BottomSheetModal = ({ children, onClose, isOpen, ...props }: Props) => {
  const bottomSheetRef = useRef<GorhomBottomSheetModal>(null);
  const reducedMotion = useReducedMotion();

  const onChange = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOpen]);

  return (
    <GorhomBottomSheetModal
      {...props}
      enableContentPanningGesture={false}
      onChange={onChange}
      ref={bottomSheetRef}
      animateOnMount={!reducedMotion}
    >
      {isOpen && <>{children}</>}
    </GorhomBottomSheetModal>
  );
};

BottomSheetModal.displayName = 'BottomSheetModal';

export { BottomSheetModal };
