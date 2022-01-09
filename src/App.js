import { useState} from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import { nanoid } from "nanoid";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import { Container } from "./components/styled/Container.styled";
import useLocalStorage from '../src/hooks/useLocalStorage';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts',[]);
  const [filter, setFilter] = useState('');

  function formSubmit ({ name, tel }){
    const contact = {
      name,
      tel,
      id: nanoid(),
    };

    if (contacts.find((item) => item.name === contact.name)) {
      toast.error(`${contact.name} is already in contacts!`);
      return;
    }

    setContacts([contact, ...contacts])
  };

  function onFilterContacts(e){
    const { value } = e.currentTarget;
    setFilter(value)
  };

  function onDeleteContact(id) {
    setContacts(prevState=>prevState.filter((contact) => contact.id !== id) )
  };

  function getVisibleContacts (){
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

    const visibleContacts = getVisibleContacts();
    return (
      <Container>
        <Toaster />
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmit} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={onFilterContacts} />

        <ContactList
          contacts={visibleContacts}
          onDeleteContact={onDeleteContact}
        />
      </Container>
    );
  }


