/** Local storage. */
export namespace LocalStorageService {
	/**
	 * Сохранить данные в localStorage.
	 * @param key Ключ.
	 * @param value Значение.
	 */
	export function set<T>(key: string, value: T): void {
		return localStorage.setItem(key, JSON.stringify(
			value,
			// @ts-ignore
			(_key, value) => (value instanceof Set ? [...value] : value)
		));
	}

	/**
	 * Получить данные из localStorage.
	 * @param key Ключ.
	 */
	export function get<T>(key: string): T | null {
		const value = localStorage.getItem(key);

		if (value !== null) {
			return JSON.parse(value) as T;
		}
		return null;
	}

	/**
	 * Удалить данные из localStorage.
	 * @param key Ключ.
	 */
	export function remove(key: string): void {
		localStorage.removeItem(key);
	}
}
