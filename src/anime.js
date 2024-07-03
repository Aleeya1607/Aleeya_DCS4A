function buttonClicked() {
    var anime = document.getElementById("anime_input").value;
    
    fetch(`https://api.jikan.moe/v4/anime?q=${anime}&limit=12`) // Adding limit=12 to fetch up to 12 results
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            // Clear previous results
            document.getElementById("results").innerHTML = '';

            for (var i = 0; i < data.data.length; i++) {
                const item = data.data[i];

                const card = document.createElement("div");
                card.className = "anime-card";

                // Image
                const image = document.createElement("img");
                image.src = item.images.jpg.image_url;
                image.alt = item.title;
                card.appendChild(image);

                // Title with link to details page
                const title = document.createElement("h2");
                const titleLink = document.createElement("a");
                titleLink.href = `detail.html?id=${item.mal_id}`;
                titleLink.innerText = item.title;
                title.appendChild(titleLink);
                card.appendChild(title);

                document.getElementById("results").appendChild(card);
            }
        });
}
