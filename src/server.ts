import mongoose from 'mongoose';
import config from './app/config';
import { Server } from 'http';
import app from './app';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
