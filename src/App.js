
import { useEffect, useState } from 'react';
import './App.scss';
import { Complaint } from './Complaint';
import { Modal } from './Modal';
import {collection, query, onSnapshot,} from 'firebase/firestore'
import {db} from './firebase'

function App() {
  const [todos, setTodos] = useState([]); 
  const [one, setOne] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'complaints'));
    
    const unsub = onSnapshot(q, (QuerySnapshot) => { 
      let todosArray = []; 
      QuerySnapshot.forEach((doc) => {
      todosArray.push({...doc.data()});
    });
    setTodos(todosArray);
  });
    return () => unsub();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'oneone'));
    
    const unsub = onSnapshot(q, (QuerySnapshot) => { 
      let todosArray = []; 
      QuerySnapshot.forEach((doc) => {
      todosArray.push({...doc.data()});
    });
    setOne(todosArray);
  });
    return () => unsub();
  }, []);

  const counter = todos.length



  return (
    <div className="App">
      <div className='header'>
       <img src='./logofinal.png' alt='logo'/>
      </div>
      <div className='button'>
     
          <Modal 
         count={counter}
           />

      </div>

      <div className='box'>
      {one.map((oneone) => (
      <div className='complaintBydeveloper'>
        <h3>Ultima reclamação</h3>
    <p> <span>
      ({oneone.oneT})
      </span> {oneone.oneC}</p>
</div>))}


        {todos.map((complaints) => (
          <Complaint 
          key={complaints.id}
          name={complaints.title} 
          text={complaints.complaint}
           />
        ))}
    
   
      </div>
  
    </div>
  );
};

export default App;
