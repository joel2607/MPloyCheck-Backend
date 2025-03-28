import * as fs from 'fs';
import * as path from 'path';

/**
 * Interface for the stored data structure
 */
interface StoredData {
  [key: string]: any;
}

/**
 * Save a value to the persistent storage
 * @param key - The key under which to store the value
 * @param value - The value to store
 */
function saveValue(key: string, value: any): void {
  const data: StoredData = {};
  const filePath = path.join(process.cwd(), 'data.json');
  
  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      Object.assign(data, JSON.parse(fileContent));
    }
  } catch (error) {
    // Handle file reading error
    console.error('Error reading data file:', error instanceof Error ? error.message : 'Unknown error');
  }
  
  data[key] = value;
  fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
}

/**
 * Retrieve a value from persistent storage
 * @param key - The key of the value to retrieve
 * @returns The stored value or null if not found
 */
function getValue<T>(key: string): T | null {
  const filePath = path.join(process.cwd(), 'data.json');
  
  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileContent) as StoredData;
      return (key in data) ? data[key] as T : null;
    }
  } catch (error) {
    // Handle file reading error
    console.error('Error retrieving data:', error instanceof Error ? error.message : 'Unknown error');
  }
  
  return null;
}

export { saveValue, getValue };
