export const GET_CONTACT= '/contact/:contactId';
export const CREATE_CONTACT = '/contact';
export const UPDATE_CONTACT = GET_CONTACT;
export const DELETE_CONTACT = GET_CONTACT;
export const GET_BY_CITY = CREATE_CONTACT + '/city';
export const GET_BY_EMAIL = CREATE_CONTACT + '/email';
export const GET_BY_PHONE = CREATE_CONTACT + '/phone';
export const SEND_EMAILS = GET_BY_EMAIL + '/sending'

export const REGISTER = '/register';
export const LOGIN = '/login';