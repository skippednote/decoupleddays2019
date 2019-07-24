import {
  sessions,
  categories,
  users,
  createSessionSuccess,
  deleteSessionSuccess
} from "../utils/fakes";

export const API = {
  getSessions: jest.fn(url => {
    if (url) {
      return sessions[0];
    } else {
      return sessions;
    }
  }),
  createSession: jest.fn(() => {
    return createSessionSuccess;
  }),
  updateSession: jest.fn(() => {
    return createSessionSuccess;
  }),
  deleteSession: jest.fn(() => {
    return deleteSessionSuccess;
  }),
  getCategories: jest.fn(() => {
    return categories;
  }),
  getUsers: jest.fn(() => {
    return users;
  })
};
