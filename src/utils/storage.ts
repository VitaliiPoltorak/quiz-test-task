export interface IStorage {
  save<T>( key: string, value: T ): void;

  load<T>( key: string, defaultValue: T ): T;

  remove( key: string ): void;
}

class LocalStorageService implements IStorage {
  save<T>( key: string, value: T ): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  load<T>( key: string, defaultValue: T ): T {
    const storedValue = localStorage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as T) : defaultValue;
  }

  remove( key: string ): void {
    localStorage.removeItem(key);
  }
}

export const storage: IStorage = new LocalStorageService();
