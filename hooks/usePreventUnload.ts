// hooks/usePreventUnload.ts
import { useEffect } from 'react';
import { useEditorStore } from '@/store/editStore';

export function usePreventUnload() {
  const isDirty = useEditorStore((state) => state.isDirty);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        // Chrome requires assigning returnValue
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);
}
