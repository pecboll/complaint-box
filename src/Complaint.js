import './App.scss';

export function Complaint(props) {

    return(
<div className='complaint'>
    <h3>{props.name}</h3>
    <p>{props.text}</p>
</div>
    );
}