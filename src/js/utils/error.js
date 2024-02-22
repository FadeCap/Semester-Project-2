export function errorMessage(message = "Unknown error") {
  return `
    <div class="card" style="width: 5rem;">
  <img src="../assets/error.svg" class="card-img-top" alt="Error image">
  <div class="card-body">
    <p class="card-text">${message}</p>
  </div>
</div>`;
}
