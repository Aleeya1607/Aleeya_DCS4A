function loadWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistElement = document.getElementById("wishlist");

    wishlistElement.innerHTML = '';

    wishlist.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add('wishlist-item');

        // Title element
        const titleElement = document.createElement("span");
        titleElement.innerText = item.title;
        listItem.appendChild(titleElement);

        // Container for dropdown and update button
        const updateContainer = document.createElement('div');
        updateContainer.classList.add('update-container');

        // Dropdown for status
        const statusSelect = document.createElement('select');
        const optionOngoing = document.createElement('option');
        optionOngoing.value = 'ongoing';
        optionOngoing.innerText = 'Ongoing';
        const optionCompleted = document.createElement('option');
        optionCompleted.value = 'completed';
        optionCompleted.innerText = 'Completed';
        statusSelect.appendChild(optionOngoing);
        statusSelect.appendChild(optionCompleted);
        statusSelect.value = item.status; // Set initial value based on stored status
        updateContainer.appendChild(statusSelect);

        // Update button
        const updateButton = document.createElement("button");
        updateButton.innerText = "Update";
        updateButton.className = "update-button";
        updateButton.onclick = () => {
            updateWishlist(index, statusSelect.value);
        };
        updateContainer.appendChild(updateButton);

        // Actions container for buttons
        const actionsContainer = document.createElement('div');
        actionsContainer.classList.add('actions');

        // Append update container to actions
        actionsContainer.appendChild(updateContainer);

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.onclick = () => {
            deleteFromWishlist(index);
        };
        actionsContainer.appendChild(deleteButton);

        // Append actions container to list item
        listItem.appendChild(actionsContainer);

        wishlistElement.appendChild(listItem);
    });
}

function updateWishlist(index, status) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    wishlist[index].status = status; // Update status of the selected item
    localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Save the updated wishlist back to localStorage
    loadWishlist(); // Reload and display the updated wishlist on the page
}

function deleteFromWishlist(index) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    loadWishlist();
}

function goToHomepage() {
    window.location.href = "index.html"; // Redirect to homepage
}

window.onload = loadWishlist;
