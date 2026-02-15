async function loadEvents() {

  eventList.innerHTML = "";

  const snapshot = await getDocs(collection(db, "events"));

  document.getElementById("totalEvents").textContent = snapshot.size;

  snapshot.forEach((docSnap) => {

    const data = docSnap.data();

    const li = document.createElement("li");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("event-info");
    infoDiv.innerHTML = `
      <strong>${data.name}</strong><br>
      ${data.city} | ${data.area} | ${data.date}
    `;

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("event-actions");

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    editBtn.onclick = () => {
      eventNameInput.value = data.name;
      cityInput.value = data.city;
      areaInput.value = data.area;
      eventDateInput.value = data.date;

      editId = docSnap.id;
      addEventBtn.textContent = "Update Event";
    };

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.onclick = async () => {
      await deleteDoc(doc(db, "events", docSnap.id));
      loadEvents();
    };

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(infoDiv);
    li.appendChild(actionsDiv);

    eventList.appendChild(li);
  });
}
