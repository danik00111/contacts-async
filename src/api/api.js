export const getContactsAPI = async () => await fetch('https://688c98e9cd9d22dda5cdbd22.mockapi.io/api/contacts').then(data=>data.json());


export const addContactAPI = async (contactToAdd) => {
  try {
    const response = await fetch("https://688c98e9cd9d22dda5cdbd22.mockapi.io/api/contacts", {
      method: "POST",
      body: JSON.stringify(contactToAdd),
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    });
    const contact = await response.json();
    return contact;
  } catch (error) {
    throw error;
  }
};



export const deleteContactAPI = async (idToDelete) => {
  await fetch(`https://688c98e9cd9d22dda5cdbd22.mockapi.io/api/contacts/${idToDelete}`, {
    method: "DELETE"
  });
  return idToDelete; 
}
export const updateContactAPI = async ({ id, updatedData }) => {
  const res = await fetch(`https://688c98e9cd9d22dda5cdbd22.mockapi.io/api/contacts/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updatedData),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}
