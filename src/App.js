
import { useEffect, useState } from 'react';
import './App.scss';
import { Complaint } from './Complaint';
import { Modal } from './Modal';
import {collection, query, onSnapshot,} from 'firebase/firestore'
import {db} from './firebase'

function App() {
  const [todos, setTodos] = useState([]); 

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

  const counter = todos.length



  return (
    <div className="App">
      <div className='header'>
       <img src='https://by3302files.storage.live.com/y4mx0h0LSaWNJNZWq0o9UDCGqs3NqZkoJNn-iEGH1wA1mRzKOK7HRz2HhECwphtvfBbKZXbaMPj-4DyQncGX3jrINVekA0GGNerJ83OBMIHvqJPoNJJZr3jUhMkMyTxzITIw8A8pnAb574RT_iZsnt6Y0Ilw0CxESyj6qfgwoJ2XuGPBDPs-P0iOQHH05f61QaS?encodeFailures=1&width=645&height=411'/>
      </div>
      <div className='button'>
     
          <Modal 
         count={counter}
           />

      </div>

      <div className='box'>
      <div className='complaintBydeveloper'>
    <h3>message by developer</h3>
    <p>thank you naiandra without you i would never have finished this shit.</p>
</div> {console.log(counter)}
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
