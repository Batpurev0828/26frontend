import mongoose from 'mongoose';
import 'dotenv/config';

const DB_URI: string = process.env.DB_URI || 'fallback';

async function connect() {
    try {
        await mongoose.connect(DB_URI);
        console.log('connected');
    } catch (e: unknown) {
        if (e instanceof Error) console.log(e.message);
        else console.log('wtf?');
    }
}

async function main() {
    try {
        await connect();
    } catch (e: unknown) {
        if (e instanceof Error) console.log(e.message);
        else console.log('wtf?');
    }
}
main();