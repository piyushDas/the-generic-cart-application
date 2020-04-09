/**
 * Service - fetched data from the endpoints
 * @url - https://api.jsonbin.io/b/5e8c3aafaf7c476bc47e47a3
 * returns json formatted response
 */

const Service = function () {
    this.getData = () => {
        return fetch('https://api.jsonbin.io/b/5e8c3aafaf7c476bc47e47a3')
                .then((response) => {
                    return response.json()
                }).then(res => {
                      for (const item of res.items) {
                        item.actual = item.price.actual
                        item.display = item.price.display
                        delete item.price
                    }
                    return res
                })
    }
}

export default Service