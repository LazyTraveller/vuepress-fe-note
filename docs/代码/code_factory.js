// promise 封装

function getJSON(url) {
  let promise = new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest()

    xhr.open('GET', url, true)

    xhr.onreadystatechange = function() {
      if (this.readyState !== 4) return 
      if (this.readyState === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }

    xhr.onerror =  function() {
      reject(new Error(this.statusText))
    }

    xhr.responseType = 'json'

    xhr.setRequestHeader('Accept', 'application/json')

    xhr.send(null)

    return promise
  })
}