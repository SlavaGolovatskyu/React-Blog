export default function setLocalStorageItems(data, isAuth = false) {
  const keys = Object.keys(data);
  keys.forEach((key) => {
    if (key !== 'password') window.localStorage.setItem(key, data[key]);
  });
  if (isAuth) window.localStorage.setItem('isAuth', true);
}
