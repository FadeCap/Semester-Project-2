export function validateEmail(email) {
    const regEx = /[\w\-\.]+@(stud\.?noroff)\.no/;
    const patternMatches = regEx.test(email);
    return patternMatches;
  }