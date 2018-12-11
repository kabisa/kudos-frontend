/* eslint-disable */
import settings from "../config/settings";

export function validateEmail(email) {
  // Taken from https://stackoverflow.com/a/46181
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function getMultipleEmails(emails) {
  return emails.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

export function isAdmin() {
  return localStorage.getItem(settings.ROLE_TOKEN) === "admin";
}

export function isModerator() {
  return localStorage.getItem(settings.ROLE_TOKEN) === "moderator";
}
