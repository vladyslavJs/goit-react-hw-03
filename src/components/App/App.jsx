// import { useState } from 'react'
import { useEffect, useState } from 'react';
import css from './App.module.css';
import { FaAddressBook } from "react-icons/fa";

import ContactList from '../ContactList/ContactList';
import SearchBox from '../SearchBox/Searchbox';
import ContactForm from '../ContactForm/ContactForm';


const userContacts = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
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
    <div className={css.container}>
      <h1 className={css.title}>Phonebook <FaAddressBook /></h1>
      <SearchBox value={filter} onFilter={setFilter} />
      <hr />
      <ContactForm onAdd={addContact} />
      <hr />
      <h2 className={css.contactTitle}>Contacts:</h2>
      <hr />
      <ContactList contacts={filterContacts} onDelete={deleteContact} />
      <hr />
    </div>
  )
}

export default App;
