import axios from 'axios'
const baseUrl = '/api/login'

const login = async (username, password) => {

  console.log("Login here!")
  const data = {
    username,
    password
  }

  console.log("Post:")
  console.log(baseUrl)
  console.log(data)
  console.log("Start to wait response..")
  const response = await axios.post(baseUrl, data)
  const user = {
    username: response.data.username,
    name: response.data.name,
    token: response.data.token
  }
  console.log(response)
  return user
}

export default {login}