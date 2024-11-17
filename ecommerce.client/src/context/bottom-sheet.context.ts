import { createContext } from "react";

type ctxType = {
    showProductBottomSheetCallback : null | ((id: string) => void);
}

export const BottomSheetContext = createContext<ctxType>({ showProductBottomSheetCallback : null });