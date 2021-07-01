// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  server: 'http://localhost:3000',
  socket: 'http://localhost:3000/api/socket',
  apiUrl: 'http://localhost:3000/api/auth',
  register: 'http://localhost:3000/api/auth/register',
  login: 'http://localhost:3000/api/auth/login',
  logout: 'http://localhost:3000/api/home/logout',
  checkUsername: 'http://localhost:3000/api/auth/checkUsername',
  loadContacts: 'http://localhost:3000/api/home/loadContacts',
  searchUsers: 'http://localhost:3000/api/home/searchUsers',
  addContact: 'http://localhost:3000/api/home/addContact',
  loadMyMessages: 'http://localhost:3000/api/message/loadMessages',
  storeSocketID: 'http://localhost:3000/api/socket/storeSocketID',
  removeSocketID: 'http://localhost:3000/api/socket/removeSocketID',
  checkOnline: 'http://localhost:3000/api/message/checkOnline',
  updateMessageHeight: 'http://localhost:3000/api/message/updateMsgHeight',
  updateMessageState: 'http://localhost:3000/api/message/updateMsgState',
  updateScrollHeight: 'http://localhost:3000/api/message/updateScrollHeight',
  checkIsOnCall: 'http://localhost:3000/api/message/checkIsOnCall',
  editProfile: 'http://localhost:3000/api/home/editProfile',
  changeProfilePic: 'http://localhost:3000/api/home/changeProfilePicture',
  removeProfilePic: 'http://localhost:3000/api/home/removeProfilePicture'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
