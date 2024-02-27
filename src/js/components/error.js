export function errorMessage(message = "Unknown error") {
    return `
    <div class="alert alert-error shadow-lg w-full rounded self-end">
      <div class="w-full">
      <svg src="../assets/error.svg"></svg>
        <span>${message}</span>
      </div>
    </div>`;
  }