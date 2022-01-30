import ReactModal from 'react-modal'
import { useState, useEffect } from 'react';
import {db} from './firebase'
import {collection, addDoc } from "firebase/firestore"


import './modal.scss'


export function Modal() {

    const [title, setTitle] = useState('');
 const [complaint, setComplaint] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title !== "") {
            await addDoc(collection(db, "todos"),{
                title,
                complaint,
            });
            setTitle("");
            setComplaint("");
        }
    }

    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
            setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            height: '70%',
            marginLeft: '10%',
            marginRight: '10%',
            marginTop: '10%',
     backgroundColor: 'rgb(85, 16, 1)',
     border: '2px solid black'
},
overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
}
}
    return(
        <>
      
        <button onClick={openModal}
        className={'reclame'}
        > Reclame </button>
        <ReactModal
         isOpen={modalIsOpen}
         shouldCloseOnEsc={true}
         style={customStyles}
         >
             <div className='esc'>
                  <button
                   onClick={closeModal}
                   > x </button>
             </div>
             <form onSubmit={handleSubmit}>
             <div className='input'>

                 <h2>Faça sua
                      <span>Reclamação</span>
                      </h2>

                 <input type="text" placeholder='Nome'
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                  /> <br/>

             <input type="text"
             placeholder='Reclamação' 
             value={complaint}
             onChange={(e) => setComplaint(e.target.value)}
             /><br/>

             <input type='submit' className='submit' />
             </div>
             
             </form>

        
        </ReactModal>
  </> )
}