// import { useState } from 'react'
import { useEffect, useState } from 'react';
import './App.css';

import ContactList from '../ContactList/ContactList';
import SearchBox from '../SearchBox/Searchbox';
import ContactForm from '../ContactForm/ContactForm';


const userContacts = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

const localStorageContacts = () => {
  const contactsList = localStorage.getItem('saved-contacts');

  return contactsList ? JSON.parse(contactsList) : userContacts;
};

function App() {
  const [contacts, setContacts] = useState(
    localStorageContacts);

  const [filter, setFilter] = useState('');

  const addContact = newContact => {
    setContacts(prevContacts => {
      return [...prevContacts, newContact];
    });
  };

  useEffect(() => {
    localStorage.setItem('saved-contacts', JSON.stringify(contacts));
  }, [contacts]);

   const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
   );
  
  const deleteContact = contactId => {
    setContacts(prevContact => {
      return prevContact.filter(contact => contact.id !== contactId);
    });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox value={filter} onFilter={setFilter}/>
      <ContactList contacts={filterContacts} onDelete={deleteContact} />
    </div>
  )
}

export default App;
