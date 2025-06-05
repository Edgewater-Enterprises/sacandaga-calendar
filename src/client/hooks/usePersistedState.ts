import { useEffect, useMemo, useState } from "react";

import { storage } from "@client/helpers/browser";
import { STORED_STATE_PREFIX } from "@shared/constants";
import type { TReactStateSetter } from "@shared/types";

export const usePersistedState = <T = undefined>({
	initialValue,
	id,
	isUseLocalStorage = false
}: { initialValue: T; id: string; isUseLocalStorage?: boolean }): [T, TReactStateSetter<T>] => {
	const browserStorage = isUseLocalStorage ? storage.local : storage.session;

	const persistedInitialValue = useMemo(() => {
		const storedValue = browserStorage.getItem<T>(`${STORED_STATE_PREFIX}:${id}`);
		return storedValue ?? initialValue;
	}, [initialValue, id, browserStorage.getItem]);

	const [state, setState] = useState<T>(persistedInitialValue);

	useEffect(() => {
		browserStorage.setItem(`${STORED_STATE_PREFIX}:${id}`, state);
	}, [id, state, browserStorage.setItem]);

	return [state, setState];
};
