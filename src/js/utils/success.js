export function successMessage(message = "Action") {
  return `
    <div class="card" style="width: 5rem;">
  <img src="../assets/success.svg" class="card-img-top" alt="Success image">
  <div class="card-body">
    <p class="card-text">${message}</p>
  </div>
</div>`;
}
