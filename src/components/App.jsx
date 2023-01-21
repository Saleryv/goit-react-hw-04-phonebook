import { useEffect, useState } from 'react';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import css from './App.module.css';

const CONTACTS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(CONTACTS_KEY)) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };

  // componentDidMount(){
  //   const localContacts = localStorage.getItem(CONTACTS_KEY);
  //   const parcedContacts = JSON.parse(localContacts);
  //   if(parcedContacts){
  //     this.setState({contacts:parcedContacts});
  //   }

  // }

  // componentDidUpdate(_, prevState){
  //   if(prevState.contacts !== this.state.contacts){
  //     localStorage.setItem(CONTACTS_KEY, JSON.stringify(this.state.contacts));
  //   }
  // }

  const contactAdd = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const contactForm = contacts.filter(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (contactForm.length) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const onChange = e => {
    setFilter(e.target.value);
  };

  const contactDelete = contactId => {
    setContacts(contacts.filter(el => el.id !== contactId));
  };

  const filterContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={css.app}>
      <h1>Phonebook</h1>
      <ContactForm contactAdd={contactAdd} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={onChange} />
      <ContactList contacts={filterContact} contactDelete={contactDelete} />
    </div>
  );
};
