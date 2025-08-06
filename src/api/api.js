export const getContactsAPI = async () => await fetch('https://688c98e9cd9d22dda5cdbd22.mockapi.io/api/contacts').then(data=>data.json());


export const addContactAPI = async (contactToAdd) => await fetch("https://688c98e9cd9d22dda5cdbd22.mockapi.io/api/contacts", {
  method: "POST",
  body: JSON.stringify(contactToAdd),
  headers: { "Content-Type": "application/json; charset=UTF-8" },
}).then(data=>data.json())
.then(contact => console.log(contact)).catch(error => console.log(error));


export const deleteContactAPI = async (idToDelete) => await fetch(`https://688c98e9cd9d22dda5cdbd22.mockapi.io/api/contacts/${idToDelete}`,
  { method: "DELETE" }
).then(() => console.log(`Post ${idToDelete} deleted`))
.catch(error => console.log("Error:", error));


export const updateContactAPI = async (idToUpdate) => await fetch(`https://688c98e9cd9d22dda5cdbd22.mockapi.io/api/contacts/${idToUpdate}`, {
  method: "PATCH",
  body: JSON.stringify(postToUpdate),
  headers: { "Content-Type": "application/json; charset=UTF-8", },
}).then(data=>data.json())
.then(contact => console.log(contact))
.catch(error => console.log("ERROR" + error));