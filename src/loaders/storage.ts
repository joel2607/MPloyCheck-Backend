import storage  from 'node-persist'

export default async function initStorage(): Promise<void>{

    const storage_metadata = await storage.init({
        dir: './data', // Directory for storing files
        stringify: JSON.stringify,
        parse: JSON.parse,
        encoding: 'utf8',
    });

    console.log(`Storage initialised at ${storage_metadata.dir}`);
}