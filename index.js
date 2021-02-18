import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

// listContacts();
// getContactById(2);

const argv = yargs(hideBin(process.argv)).argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      await addContact(name, email, phone);
      listContacts();
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
