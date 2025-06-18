
export class DataService {
  private static instance: DataService;
  
  static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  // Generic save method
  save<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  }

  // Generic load method
  load<T>(key: string, defaultValue: T): T {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.error('Failed to load data:', error);
      return defaultValue;
    }
  }

  // Clear all data
  clear(): void {
    localStorage.clear();
  }

  // Remove specific key
  remove(key: string): void {
    localStorage.removeItem(key);
  }

  // Check if key exists
  exists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  // Export data for backup
  exportData(): Record<string, any> {
    const data: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        try {
          data[key] = JSON.parse(localStorage.getItem(key) || '');
        } catch {
          data[key] = localStorage.getItem(key);
        }
      }
    }
    return data;
  }

  // Import data from backup
  importData(data: Record<string, any>): void {
    Object.entries(data).forEach(([key, value]) => {
      this.save(key, value);
    });
  }
}

export const dataService = DataService.getInstance();
