export const sleep = (duration) =>
  new Promise((resolve) => setTimeout(() => resolve(), duration));

export const random = () => Math.floor(Math.random() * 10000).toString();
