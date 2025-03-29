import axios from 'axios'

export const getUser = (accessToken) =>
  axios({
    url: 'https://graph.facebook.com/me',
    method: 'get',
    data: {
      access_token: accessToken,
      fields: 'id, name, email, picture'
    }
  })
    .then(({ data }) => {
      const { id, name, email, picture } = data
      return {
        service: 'facebook',
        picture: picture.data.url,
        id,
        name,
        email
      }
    })
