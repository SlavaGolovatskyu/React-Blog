export default function setLocalStorageItems(data) {
  const keys = Object.keys(data);
  keys.forEach((key) => {
    if (key !== "password") window.localStorage.setItem(key, data[key]);
  });
  window.localStorage.setItem("isAuth", true);
}
