import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import initialContacts from './contacts.json';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { SearchForm } from './SearchForm/SearchForm';
const LSKEY = 'phonebook-contacts';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filterName, setFilterName] = useState('');

  // CDM
  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem(LSKEY));
    if (parsedContacts.length > 0) {
      setContacts(() => [...parsedContacts]);
    } else {
      setContacts(() => [...initialContacts]);
    }
  }, []);

  // CDU
  useEffect(() => {
    localStorage.setItem(LSKEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleDeleteContact = ev => {
    const { id } = ev.target;
    setContacts(contacts.filter(el => el.id !== id));
  };

  const handleAddContact = values => {
    if (
      contacts.find(el => el.name.toLowerCase() === values.name.toLowerCase())
    ) {
      alert(`${values.name} is already exists in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(4),
      name: values.name,
      number: values.number,
    };
    setContacts(prevState => {
      return [newContact, ...prevState];
    });
  };

  const handleFilterChange = ev => {
    const { value } = ev.currentTarget;
    setFilterName(value);
  };

  return (
    <main>
      <h1>Phonebook</h1>
      <ContactForm onContactAdd={handleAddContact} />
      <SearchForm onFilterChange={handleFilterChange} />
      <ContactList
        contacts={contacts.filter(contact => {
          return contact.name.toLowerCase().includes(filterName.toLowerCase());
        })}
        onDeleteContact={handleDeleteContact}
      />
    </main>
  );
};
