// script.js

import { db } from './firebase-config.js';

import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";



const guestForm = document.getElementById('guest-form');
const guestInput = document.getElementById('guest-name');
const guestList = document.getElementById('guest-list');
const guestsRef = collection(db, 'guests');

// Add new guest
guestForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = guestInput.value.trim();
  if (name !== "") {
    await addDoc(guestsRef, { name, checkedIn: false });
    guestInput.value = "";
  }
});

// Display guest list in real-time
onSnapshot(guestsRef, (snapshot) => {
  guestList.innerHTML = '';
  snapshot.forEach(docSnap => {
    const li = document.createElement('li');
    li.textContent = docSnap.data().name;

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
