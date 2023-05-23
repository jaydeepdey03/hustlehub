import { Client, Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('646b8b773c93e3658faf');


export const SDK = new Account(client);