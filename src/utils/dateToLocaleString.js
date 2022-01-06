export default function dateToLocaleString(created) {
  const createdAt = new Date(created);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const accountCreated = createdAt.toLocaleDateString("ru-RU", options);

  return accountCreated;
}
