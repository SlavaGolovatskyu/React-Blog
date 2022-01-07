import { instance } from '../config/axios';

async function getUserById(id) {
  const getUserURL = `users/${id}`;
  try {
    const { data } = await instance.get(getUserURL);
    return data;
  } catch (e) {
    console.log(e);
  }
}

export default getUserById;
