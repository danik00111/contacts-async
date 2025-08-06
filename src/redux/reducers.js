import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getContactsAPI, addContactAPI, deleteContactAPI, updateContactAPI } from "../api/api";

export const getContactsThunk = createAsyncThunk('contacts/getContacts',async (_,thunkAPI)=> getContactsAPI() )
export const addContactThunk = createAsyncThunk('contacts/addContact',async (contact,thunkAPI)=> addContactAPI(contact) )
export const deleteContactThunk = createAsyncThunk('contacts/deleteContact',async (id,thunkAPI)=> deleteContactAPI(id) )
export const updateContactThunk = createAsyncThunk('contacts/updateContact',async (id,thunkAPI)=> updateContactAPI(id) )

const initstate = { contacts:[], filter:'' }

const contactSlice = createSlice({
  name: "contacts",
  "initialState": initstate.contacts,
  // reducers: {
  //   add(state,action) {
  //     const takenids = state.map(x=>x.id);
  //     let newid = 1;
  //     while(true) {
  //       if(!takenids.includes(newid)) break;
  //       newid++;
  //     }
  //     const newcontact = { ...action.payload, id: newid };
  //     return [...state, newcontact];
  //     console.log(state);
  //     console.log(action);
  //     console.log(action.payload);
  //     state = action.payload;
  //   },
  //   del(state,action) {
  //     return [...state].filter(x=>x.id!=action.payload)
  //   }
  // },
  extraReducers: (builder) => {
    builder
      .addCase(getContactsThunk.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.push(action.payload);
        return state;
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        const indexToDelete = state.findIndex(x=>x.id==action.payload)
        if(indexToDelete!=-1) state.splice(indexToDelete,1)
        return state;
      })
      .addCase(updateContactThunk.fulfilled, (state, action) => {
        const indexToUpdate = state.findIndex(x=>x.id==action.payload);
        const newObject = {name:'John Doe',number:'123-456-7890'} // де знайти новий об'єкт?
        if(indexToUpdate!=-1) state.splice(indexToUpdate,1,newObject)
        return state;
      })
      // // You can match a range of action types
      // .addCase(get)
      // .addMatcher(
      //   isRejectedAction,
      //   // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
      //   (state, action) => {},
      // )
      // // and provide a default case if no other handlers matched
      // .addDefaultCase((state, action) => {})
  },
})

const filterSlice = createSlice({
  name: "filter",
  "initialState": initstate.filter,
  reducers: {
    set(state,action) {
      return action.payload;
    }
  }
})

export const { add, del } = contactSlice.actions
export const { set } = filterSlice.actions
export const contactReducer = contactSlice.reducer
export const filterReducer = filterSlice.reducer

// export const contactReducer = (state = [], action) => {
//       if (action.type === "addcontact") {
//         const takenids = state.map(x=>x.id);
//         let newid = 1;
//         while(true) {
//           if(!takenids.includes(newid)) break;
//           newid++;
//         }
//         const newcontact = { ...action.payload, id: newid };
//         return [...state, newcontact];
//       }
//       if (action.type === "delcontact") {
//         return [...state].filter(x=>x.id!=action.payload)
//       }
//       return state;
// };


// export const filterReducer = (state = '', action) => {
//       if (action.type === "setfilter") {
//         return action.payload;
//       }
//       return state
// };