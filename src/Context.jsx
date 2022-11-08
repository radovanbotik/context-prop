import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { people } from "./data";

const PersonContext = React.createContext();
// Provider, Consumer

export default function Context() {
  const [peopleData, setPeopleData] = useState(people);
  const removePerson = id => {
    setPeopleData(prev => {
      return prev.filter(person => person.id !== id);
    });
  };
  return (
    <PersonContext.Provider value={{ removePerson, peopleData }}>
      <List />
    </PersonContext.Provider>
  );
}

function List() {
  const data = useContext(PersonContext);
  const { peopleData } = data;

  return (
    <div>
      {peopleData.map(entry => (
        <SinglePerson key={entry.id} {...entry} />
      ))}
    </div>
  );
}
function SinglePerson(props) {
  const data = useContext(PersonContext);
  const { removePerson } = data;
  console.log(data);
  return (
    <div>
      <h4>{props.name}</h4>
      <button onClick={e => removePerson(props.id)}>remove</button>
    </div>
  );
}
