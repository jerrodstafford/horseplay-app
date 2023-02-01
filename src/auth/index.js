export function storeCurrentUser(data) {
  console.log(data)
  localStorage.setItem('token', data.data.token)
  localStorage.setItem('userId', data.data.user.id)
  localStorage.setItem('username', data.data.user.username)
}

export function getCurrentUser() {
  if(!localStorage.getItem('token')) {
    return null;
  } else {
  const user = {
    id: localStorage.getItem('userId'),
    username: localStorage.getItem('username')
  }
  return user;
}}