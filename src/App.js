
import { useEffect, useState } from 'react';
import './App.scss';
import { Complaint } from './Complaint';
import { Modal } from './Modal';
import {collection, query, onSnapshot,} from 'firebase/firestore'
import {db} from './firebase'

function App() {
  const [todos, setTodos] = useState([]); 

  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsub = onSnapshot(q, (QuerySnapshot) => { 
      let todosArray = []; 
      QuerySnapshot.forEach((doc) => {
      todosArray.push({...doc.data(), id: doc.id });
    });
    setTodos(todosArray);
  });
    return () => unsub();
  }, []);
  
  return (
    <div className="App">
      <div className='header'>
        <h1 className="title"> Caixa de <span>Reclamações</span></h1>
      </div>
      <div className='button'>
        <Modal />
      </div>

      <div className='box'>
      <div className='complaintBydeveloper'>
    <h3>message by developer</h3>
    <p>thank you naiandra without you i would never have finished this shit.</p>
</div>
        {todos.map((todo) => (
          <Complaint 
          key={todo.id}
          name={todo.title} 
          text={todo.complaint} />
        ))}
    
   
      </div>
  
    </div>
  );
};

export default App;
