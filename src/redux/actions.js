import { createAction } from "@reduxjs/toolkit";
export const add = createAction("contacts/add");
export const del = createAction("contacts/del");
export const set = createAction("filter/set");