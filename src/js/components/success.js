export function successMessage(message = "Action") {
    return `<div class="alert alert-success shadow-lg rounded">
    <div>
        <svg src="../assets/error.svg"></svg>
      <span>${message} successful!</span>
    </div>
  </div>`;
  }