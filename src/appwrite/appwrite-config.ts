import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646b8b773c93e3658faf");

export const SDK = new Account(client);
export const DB = new Databases(client);
export const storage = new Storage(client);
