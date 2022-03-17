import ReactModal from 'react-modal'
import { useState, useEffect} from 'react';
import {db} from './firebase'
import { setDoc, doc, } from "firebase/firestore"


import './modal.scss'


export function Modal(props) {

    

    const [title, setTitle] = useState('');
    const [complaint, setComplaint] = useState('');
    const  [oneT, setOneT] = useState('');
    const  [oneC, setOneC] = useState('')
    const [id, setId] = useState('');
    
 useEffect(() => {
 setId(`complaint${props.count}`)
  }, [props]);


  useEffect(() => {setOneC(complaint);}, [complaint])
  useEffect(() => {setOneT(title);}, [title])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title !== "" & complaint !== "") {
            await setDoc(doc(db, "complaints", id),{
                title,
                complaint,
                id,
                oneT,
                oneC,
            });
            setTitle("");
            setComplaint("");
            setIsOpen(false);
        } if (title !== "" & complaint !== ""){
            await setDoc(doc(db, "oneone", "one"),{
                oneT,
                oneC,
            });
            setOneT("");
            setOneC("");
    }}
    


    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
            setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
}
}
    return(
        
        <>
      {console.log(id)}


        <button onClick={openModal}
        className={'reclame'}
        > Reclame </button>
        <ReactModal
         isOpen={modalIsOpen}
         shouldCloseOnEsc={true}
         style={customStyles}
         ariaHideApp={false}
         >
             <div className='esc'>
                  <button
                   onClick={closeModal}
                   > x </button>
             </div>
             <form onSubmit={handleSubmit}>
             <div className='input'>
        
                 <h2>Faça sua <span> Reclamação</span>
                      
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


