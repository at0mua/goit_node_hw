import * as fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    console.table(JSON.parse(contacts));
  } catch (err) {
    console.error(err.message);
  }
};

export const getContactById = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const contactById = parsedContacts.find(
      (contact) => contact.id === contactId
    );
    console.table(contactById);
  } catch (err) {
    console.error(err.message);
  }
};

export const removeContact = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const filterContacts = parsedContacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(filterContacts));
    console.table(filterContacts);
  } catch (err) {
    console.error(err.message);
  }
};

export const addContact = async (name, email, phone) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const id = parsedContacts.length > 0 ? [...parsedContacts].pop().id + 1 : 1;
    const contact = { id, name, email, phone };
    await fs.writeFile(
      contactsPath,
      JSON.stringify([...parsedContacts, contact])
    );
  } catch (err) {
    console.error(err.message);
  }
};
