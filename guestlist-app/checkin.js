
// // checkin.js

// import { db } from './firebase-config.js';
// import {
//   collection,
//   onSnapshot,
//   doc,
//   updateDoc
// } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// const guestList = document.getElementById('guest-list');
// const guestsRef = collection(db, 'guests');

// // ✅ Fix: use snapshot.docs.forEach to access the index
// onSnapshot(guestsRef, (snapshot) => {
//   guestList.innerHTML = '';

//   snapshot.docs.forEach((docSnap, index) => {  // ✅ CHANGED this line
//     const guest = docSnap.data();
//     const li = document.createElement('li');

//     // ✅ Use index for numbering
//     li.textContent = `${index + 1}. ${guest.name}`;

//     // Blur if checked in
//     if (guest.checkedIn) {
//       li.classList.add('blurred');
//     }

//     // Check-in button
//     const checkInBtn = document.createElement('button');
//     checkInBtn.textContent = guest.checkedIn ? 'Checked In' : 'Check In';
//     checkInBtn.disabled = guest.checkedIn;

//     checkInBtn.onclick = async () => {
//       await updateDoc(doc(db, 'guests', docSnap.id), {
//         checkedIn: true
//       });
//     };

//     li.appendChild(checkInBtn);
//     guestList.appendChild(li);
//   });
// });





import { db } from './firebase-config.js';
import {
  collection,
  onSnapshot,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const guestList = document.getElementById('guest-list');
const guestsRef = collection(db, 'guests');

// ✅ New: Grab the search input element
const searchInput = document.getElementById('search-input');

let allGuests = []; // ✅ Store all guests locally for filtering

// Listen to Firestore changes and update list
onSnapshot(guestsRef, (snapshot) => {
  allGuests = []; // Clear previous data

  snapshot.forEach(docSnap => {
    const guest = { id: docSnap.id, ...docSnap.data() };
    allGuests.push(guest);
  });

  // ✅ Sort alphabetically by name
  allGuests.sort((a, b) => a.name.localeCompare(b.name));

  renderGuestList(allGuests);
});

// ✅ New: Render function to display guests filtered by search
function renderGuestList(guests) {
  guestList.innerHTML = '';

  guests.forEach((guest, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${guest.name}`;

    if (guest.checkedIn) {
      li.classList.add('blurred');
    }

    const checkInBtn = document.createElement('button');
    checkInBtn.textContent = guest.checkedIn ? 'Checked In' : 'Check In';
    checkInBtn.disabled = guest.checkedIn;

    checkInBtn.onclick = async () => {
      await updateDoc(doc(db, 'guests', guest.id), {
        checkedIn: true
      });
    };

    li.appendChild(checkInBtn);
    guestList.appendChild(li);
  });
}

// ✅ New: Listen for input on the search box to filter the displayed list
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();

  const filteredGuests = allGuests.filter(guest => 
    guest.name.toLowerCase().includes(query)
  );

  renderGuestList(filteredGuests);
});
