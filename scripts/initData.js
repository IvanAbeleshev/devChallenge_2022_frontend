const data = new Promise((resolve, reject) => {
    return fetch("./src/events.json").then(response => {
        if (response.ok) {
        resolve(response.json())
        } else {
        reject(new Error('error'))
        }
    }, error => {
    reject(new Error(error.message))
    })
}); 

const specification = new Promise((resolve, reject) => {
    return fetch("./src/names.json").then(response => {
        if (response.ok) {
        resolve(response.json())
        } else {
        reject(new Error('error'))
        }
    }, error => {
    reject(new Error(error.message))
    })
}); 



