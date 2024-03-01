import { renderPosts } from './renderListing.js';
import { createListing } from './createListing.js';
import { redirectPostById } from "./redirectPostById.js";


// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", async function () {
    // Call the function to render posts
    await renderPosts();

    // Event listener for submitting the post form
    document.getElementById("post-form").addEventListener("submit", createListing);
    
    // Event listener for clicking on the new post button
    document.getElementById("new-post-button").addEventListener("click", function () {
        document.getElementById("post-modal").style.display = "block";
    });

    // Event listener for closing the post modal
    document.getElementById("close-button").addEventListener("click", function () {
        document.getElementById("post-modal").style.display = "none";
    });

    // Event listener to close the post modal when clicked outside
    window.addEventListener("click", function (event) {
        var modal = document.getElementById("post-modal");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
