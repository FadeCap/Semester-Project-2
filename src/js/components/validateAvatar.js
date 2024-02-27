export function validateAvatar(avatar) {
    let userAvatar;
    if (avatar !== "" && avatar) {
      userAvatar = avatar;
    } else {
      userAvatar = "../assets/no-user-avatar.png";
    }
    return userAvatar;
  }