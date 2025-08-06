import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getContactsAPI, addContactAPI, deleteContactAPI, updateContactAPI } from "../api/api";

export const getContactsThunk = createAsyncThunk('contacts/getContacts',async(_,__)=> getContactsAPI() )
export const addContactThunk = createAsyncThunk('contacts/addContact',async(contact,_)=> addContactAPI(contact) )
export const deleteContactThunk = createAsyncThunk('contacts/deleteContact',async(id,_)=> deleteContactAPI(id) )
export const updateContactThunk = createAsyncThunk('contacts/updateContact',async({id,newData})=> await updateContactAPI({id,newData}) )


const initstate = { contacts:[], filter:'' }

const contactSlice = createSlice({
  name: "contacts",
  "initialState": initstate.contacts,
  // reducers: {
  //   add(s,a) {
  //     const takenids = s.map(x=>x.id);
  //     let newid = 1;
  //     while(true) {
  //       if(!takenids.includes(newid)) break;
  //       newid++;
  //     }
  //     const newcontact = { ...a.payload, id: newid };
  //     return [...s, newcontact];
  //     console.log(s);
  //     console.log(a);
  //     console.log(a.payload);
  //     s = a.payload;
  //   },
  //   del(s,a) {
  //     return [...s].filter(x=>x.id!=a.payload)
  //   }
  // },
  extraReducers: builder=> {
    builder
      .addCase(getContactsThunk.fulfilled, (s,a)=> { s=a.payload; return s })
      .addCase(addContactThunk.fulfilled, (s,a)=> { s.push(a.payload); return s })
      .addCase(deleteContactThunk.fulfilled, (s,a)=> {
        const indexToDelete = s.findIndex(x=>x.id==a.payload);
        if (indexToDelete!=-1) s.splice(indexToDelete,1);
      })
      .addCase(updateContactThunk.fulfilled, (s,a)=> {
        const updatedContact = a.payload;
        const index = s.findIndex(x => x.id == updatedContact.id);
        if (index != -1) s[index] = updatedContact;
      })
  },
})

const filterSlice = createSlice({
  name: "filter",
  "initialState": initstate.filter,
  reducers: { set(s,a) { return a.payload } }
})

export const { add, del } = contactSlice.actions
export const { set } = filterSlice.actions
export const contactReducer = contactSlice.reducer
export const filterReducer = filterSlice.reducer