const path = require('path');
const fs = require('fs/promises');
const contactsPath = path.join(__dirname, './db/contacts.json');
const {v4}=require('uuid'); 

const listContacts = async ()=> {
  const contacts = await fs.readFile(contactsPath);
   return JSON.parse(contacts);
    };

 
    const getContactById = async(id)=> {
   const contacts = await listContacts();
   const result = contacts.find(item=>+item.id===id);
   if(!result){return null;}
   return result;
 };
 
 const removeContact = async (id) => {
   const contacts = await listContacts();
   const idx = contacts.findIndex((item) => +item.id === id);
   if (idx === -1) {
     return null;
   }
   const updateListContacts = contacts.filter((_, index) => index !== idx);
   await fs.writeFile(contactsPath, JSON.stringify(updateListContacts));
   return contacts[idx];
 };
 
 const addContact = async(name, email, phone) => {
   const contacts = await listContacts();
   const newContact = {id:v4(), name, email, phone};
   contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
 }

 module.exports = {listContacts, getContactById,removeContact,addContact};