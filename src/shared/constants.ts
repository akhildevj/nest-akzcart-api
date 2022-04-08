export const GET_MESSAGE = 'Succesfully fetched data';
export const DELETE_MESSAGE = 'Succesfully deleted';
export const ADD_MESSAGE = 'Succesfully added';
export const UPDATE_MESSAGE = 'Succesfully updated';
export const INVALID_ID = 'Invalid id';
export const USER_EXISTS = 'User already exists';
export const SORT = {
  TIME: 1,
  TIME_TEXT: 'last_updated_at',
  RATING: 2,
  RATING_TEXT: 'rating',
  PRICE: 3,
  PRICE_TEXT: 'price',
};
export const ORDER = {
  DESCENDING: 1,
  DESCENDING_TEXT: 'DESC',
  ASCENDING: 2,
  ASCENDING_TEXT: 'ASC',
};
export const RATING_ENUM = [0, 1, 2, 3, 4];
export const SORT_ENUM = [SORT.TIME, SORT.RATING, SORT.PRICE];
export const ORDER_ENUM = [ORDER.DESCENDING, ORDER.ASCENDING];
