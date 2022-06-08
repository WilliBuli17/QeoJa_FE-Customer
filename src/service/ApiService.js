class ApiService {
  constructor () {
    // this._url = 'http://127.0.0.1:8000/api/'
    this._url = 'https://7ffa-180-249-206-70.ap.ngrok.io/api/'
  }

  async storeData (http, sublink, data) {
    let token

    if (sessionStorage.getItem('token')) {
      token = sessionStorage.getItem('token')
    } else if (localStorage.getItem('token')) {
      token = localStorage.getItem('token')
    }

    const link = this._url + sublink
    try {
      const result = await http.post(link, data, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })

      return result
    } catch (error) {
      return error.response
    }
  }

  async getData (http, sublink) {
    let token

    if (sessionStorage.getItem('token')) {
      token = sessionStorage.getItem('token')
    } else if (localStorage.getItem('token')) {
      token = localStorage.getItem('token')
    }

    const link = this._url + sublink
    try {
      const result = await http.get(link, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })

      return result
    } catch (error) {
      return error.response
    }
  }

  async updateData (http, sublink, data) {
    let token

    if (sessionStorage.getItem('token')) {
      token = sessionStorage.getItem('token')
    } else if (localStorage.getItem('token')) {
      token = localStorage.getItem('token')
    }

    const link = this._url + sublink
    try {
      const result = await http.put(link, data, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })

      return result
    } catch (error) {
      return error.response
    }
  }

  async deleteData (http, sublink) {
    let token

    if (sessionStorage.getItem('token')) {
      token = sessionStorage.getItem('token')
    } else if (localStorage.getItem('token')) {
      token = localStorage.getItem('token')
    }

    const link = this._url + sublink
    try {
      const result = await http.delete(link, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })

      return result
    } catch (error) {
      return error.response
    }
  }
}

module.exports = ApiService
