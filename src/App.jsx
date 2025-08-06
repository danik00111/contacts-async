import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { add, del, set } from './redux/actions'
import { addContactThunk, deleteContactThunk, getContactsThunk } from './redux/reducers'


function App() {
  const contacts = useSelector(state=>state.cont)
  const filter = useSelector(state=>state.fil)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getContactsThunk())
  },[])
const addcontact = async (e) => {
  e.preventDefault();
  const name = e.target.elements.inputname.value
  const number = e.target.elements.inputnumber.value

  await dispatch(addContactThunk({ name, number }))
  e.target.elements.inputname.value = ""
  e.target.elements.inputnumber.value = ""
};


  const delcontact =e=> {
    e.preventDefault()
    dispatch(deleteContactThunk(e.target.elements.delID.value))
  }

  const filt =e=> {
    e.preventDefault()
    dispatch(set(e.target.value))
  }

  // const 

  return (<>
    <form onSubmit={addcontact}>
      <input required type="text" name="inputname" id="input-name" placeholder='Name' />
      <input required type="text" name="inputnumber" id="input-number" placeholder='Number (no letters)' pattern='^[^A-Za-z]*$' />
      <button type='submit'>Add Contact</button>
    </form>
    <form onSubmit={delcontact}>
      <input required name="delID" type="number" id="del-id" placeholder='ID' />
      <button type='submit'>Delete Contact</button>
    </form>
    <input type="text" name="filter" id="filter" placeholder='Filter'
      onInput={filt}/>
    <ul>
      {contacts.filter(x => x && x.name && x.name.toLowerCase().includes(filter.toLowerCase())).map((x,i)=>(
        <li key={x.id}>
          <p>
            <span style={{fontSize:'0.5em'}}>#{x.id}</span>&nbsp;{x.name}:&nbsp;<code style={{fontStyle:'italic',color:'yellow'}}>{x.number}</code>
          </p>
        </li>
      ))}
    </ul>
  </>)
}

export default App
