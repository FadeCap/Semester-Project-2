export function filterListings(searchTerm) {
    const listings = document.querySelectorAll('.listings-container');

    listings.forEach(function(listing) {
        const title = listing.querySelector('.card-text').textContent.toLowerCase();
        
        if (title.includes(searchTerm)) {
            listing.style.display = 'block';
        } else {
            listing.style.display = 'none';
        }
    });
}
