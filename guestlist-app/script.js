// // script.js

// import { db } from './firebase-config.js';

// import {
//   collection,
//   addDoc,
//   getDocs,
//   onSnapshot,
//   deleteDoc,
//   doc
// } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";



// const guestForm = document.getElementById('guest-form');
// const guestInput = document.getElementById('guest-name');
// const guestList = document.getElementById('guest-list');
// const guestsRef = collection(db, 'guests');

// // Add new guest
// guestForm.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const name = guestInput.value.trim();
//   if (name !== "") {
//     await addDoc(guestsRef, { name, checkedIn: false });
//     guestInput.value = "";
//   }
// });

// // Display guest list in real-time
// onSnapshot(guestsRef, (snapshot) => {
//   guestList.innerHTML = '';
//   snapshot.forEach(docSnap => {
//     const li = document.createElement('li');
//     li.textContent = docSnap.data().name;

//     const delBtn = document.createElement('button');
//     delBtn.textContent = '×';
//     delBtn.className = 'delete-btn';
//     delBtn.onclick = async () => {
//       await deleteDoc(doc(db, 'guests', docSnap.id));
//     };

//     li.appendChild(delBtn);
//     guestList.appendChild(li);
//   });
// });




// script.js

import { db } from './firebase-config.js';

import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// 🔻 References
const guestInput = document.getElementById('guest-name');
const guestList = document.getElementById('guest-list');
const addVIPBtn = document.getElementById('add-vip');         // ✅ NEW
const addRegularBtn = document.getElementById('add-regular'); // ✅ NEW
const guestsRef = collection(db, 'guests');

// ✅ Add to VIP
addVIPBtn.addEventListener('click', async () => {
  const name = guestInput.value.trim();
  if (name !== "") {
    await addDoc(guestsRef, { name, type: 'VIP', checkedIn: false });
    guestInput.value = "";
  }
});

// ✅ Add to Regular
addRegularBtn.addEventListener('click', async () => {
  const name = guestInput.value.trim();
  if (name !== "") {
    await addDoc(guestsRef, { name, type: 'Regular', checkedIn: false });
    guestInput.value = "";
  }
});

// 🔁 Display guest list in real-time
onSnapshot(guestsRef, (snapshot) => {
  guestList.innerHTML = '';
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const li = document.createElement('li');
    li.textContent = `${data.name} (${data.type})`;  // ✅ shows type

    const delBtn = document.createElement('button');
    delBtn.textContent = '×';
    delBtn.className = 'delete-btn';
    delBtn.onclick = async () => {
      await deleteDoc(doc(db, 'guests', docSnap.id));
    };

    li.appendChild(delBtn);
    guestList.appendChild(li);
  });
});
