function getAnimeDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const animeId = urlParams.get('id');

    fetch(`https://api.jikan.moe/v4/anime/${animeId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const item = data.data;

            const title = document.getElementById("anime-title");
            title.innerText = item.title;

            const details = document.getElementById("anime-details");
            details.innerHTML = ''; // Clear previous details

            // Adding the anime image
            const image = document.createElement("img");
            image.src = item.images.jpg.image_url;
            image.alt = item.title;
            image.className = "anime-image"; // Apply the anime-image class
            details.appendChild(image);

            // Function to create a container with text
            function createContainer(label, text) {
                const container = document.createElement("div");
                container.className = "detail-container";
                const labelElement = document.createElement("h3");
                labelElement.innerText = label;
                const textElement = document.createElement("p");
                textElement.innerText = text;
                container.appendChild(labelElement);
                container.appendChild(textElement);
                return container;
            }

            // Adding other details to the page
            details.appendChild(createContainer("Synopsis", item.synopsis));
            details.appendChild(createContainer("Score", item.score));
            details.appendChild(createContainer("Rank", item.rank));
            details.appendChild(createContainer("Popularity", item.popularity));
            details.appendChild(createContainer("Genres", item.genres.map(genre => genre.name).join(', ')));
            details.appendChild(createContainer("Producers", item.producers.map(producer => producer.name).join(', ')));
            details.appendChild(createContainer("Source", item.source));
            details.appendChild(createContainer("Rating", item.rating));
            details.appendChild(createContainer("Release", item.aired.string));

            

            const linkContainer = document.createElement("div");
            linkContainer.className = "detail-container";
            const linkElement = document.createElement("a");
            linkElement.href = item.url;
            linkElement.innerText = "More info";
            linkElement.target = "_blank";
            linkContainer.appendChild(linkElement);
            details.appendChild(linkContainer);

            document.getElementById('btnAddToWishlist').onclick = () => addToWishlist(item.title);
        });
}

function addToWishlist(animeTitle) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Check if the animeTitle already exists in the wishlist
    if (wishlist.some(item => item.title === animeTitle)) {
        alert("Already added to your wishlist!");
        return; // Exit function if item already exists
    }

    // If not already added, push the new item to the wishlist
    wishlist.push({ title: animeTitle, status: 'ongoing' }); // Example structure, adjust as needed

    // Update localStorage with the updated wishlist
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    // Reload wishlist to reflect the added item
    loadWishlist();
}


function goBack() {
    window.history.back();
}

window.onload = getAnimeDetails;