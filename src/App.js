import ReactModal from 'react-modal'
import { useEffect, useState } from 'react';
import './App.scss';
import { Complaint } from './Complaint';
import { Modal } from './Modal';
import {collection, query, onSnapshot,} from 'firebase/firestore'
import {db} from './firebase'
import Cookies from 'universal-cookie';

function App() {
  const [todos, setTodos] = useState([]); 
  const [one, setOne] = useState([]);
  const counter = todos.length
  const cookies = new Cookies();


//Complaints
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


//Ultima reclamação
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


  //modal

const [modalIsOpen, setIsOpen] = useState(false);

const [name, setName] = useState(cookies.get('name'));
useEffect(() => { console.log(cookies.get('login'))
  if(cookies.get('login') !== 'true')
  {setIsOpen(true);
  setName('');
console.log('q')}
// = true
 else{setIsOpen(false);}}, []);

 
 
  
  const customStyles = {
    content: {
        height: '60%',
        marginLeft: '1%',
        marginRight: '1%',
        marginTop: '10%',
 backgroundColor: 'rgb(100, 100, 100)',
 border: '2px solid black'
},
overlay: {
position: 'fixed',
top: 0,
left: 0,
right: 0,
bottom: 0,
backgroundColor: 'rgba(100, 100, 100, 0.99)'
  }
}




  return (
    <div className="App">

      <div className='header'>
       <img src='./logofinal.png' alt='logo'/>
      </div>
      <div className='button'>
     
          <Modal 
         count={counter}
         name={name}
           />

      </div>

      <div className='box'>
      {one.map((oneone) => (
      <div className='complaintBydeveloper'>
        <h3>Ultima reclamação</h3>
    <p> <span>
      {oneone.oneT} disse:
      </span> {oneone.oneC}</p>
</div>))}


        {todos.map((complaints) => (
          <Complaint 
          key={complaints.id.toString()}
          name={complaints.title} 
          text={complaints.complaint}
           />
        ))}
    
    <ReactModal isOpen={modalIsOpen}
         shouldCloseOnEsc={false}
         style={customStyles}
         ariaHideApp={false}
    > <div className='Mlogin'>
      <img src='./logofinal.png' alt='logo'/>
      <h3>Digite seu nome !</h3>
      <p>(Não serar possivel a alteração futuramente) </p>

      <input type="text" value={name} autoFocus={true}
       onChange={(e) => setName(e.target.value)}/> <br/> 
       <button onClick={() => {
  if(name !== "" & name !== " "){
     cookies.set("name", name, {path : '/' });
     cookies.set("login", true, {path : '/' });
     setIsOpen(false);
     
   }}}>OK</button>

    </div>
    

    </ReactModal>
   
      </div>
  
    </div>
  );
};

export default App;
