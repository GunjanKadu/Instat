/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github //github.com/GunjanKadu
 * @date   2020-04-25 23:47:36
 *
 */

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyAPCWDwJEHEDGz_s2Si39cIO-KGa_iJCa4',
  authDomain: 'react-slack-clone-4b014.firebaseapp.com',
  databaseURL: 'https://react-slack-clone-4b014.firebaseio.com',
  projectId: 'react-slack-clone-4b014',
  storageBucket: 'react-slack-clone-4b014.appspot.com',
  appId: '1:677245625699:web:3d13f1e5aaae7b43b2df56',
  measurementId: 'G-E8Q0WP36CQ',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
