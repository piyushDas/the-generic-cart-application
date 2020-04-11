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
                    res = {
                        "items": [
                          {
                            "name": "Samsung Series 4",
                            "price": {
                              "actual": 13999,
                              "display": 22500
                            },
                            "discount": 37
                          },
                          {
                            "name": "Samsung Super 6",
                            "price": {
                              "actual": 35999,
                              "display": 66900
                            },
                            "discount": 46
                          },
                          {
                            "name": "Samsung The Frame",
                            "price": {
                              "actual": 84999,
                              "display": 133900
                            },
                            "discount": 36
                          },
                          {
                            "name": "Thomson B9 Pro",
                            "price": {
                              "actual": 9999,
                              "display": 16999
                            },
                            "discount": 41
                          },
                          {
                            "name": "LG Ultra HD",
                            "price": {
                              "actual": 39990,
                              "display": 79990
                            },
                            "discount": 50
                          },
                          {
                            "name": "Vu Ready LED TV",
                            "price": {
                              "actual": 7999,
                              "display": 17000
                            },
                            "discount": 52
                          },
                          {
                            "name": "Koryo Android TV",
                            "price": {
                              "actual": 55999,
                              "display": 199990
                            },
                            "discount": 71
                          },
                          {
                            "name": "Micromax LED Smart",
                            "price": {
                              "actual": 9999,
                              "display": 27990
                            },
                            "discount": 64
                          }
                        ]
                      }
                      for (const [idx, item] of res.items.entries()) {
                        item.id = `item_${idx}`
                        item.actual = item.price.actual
                        item.display = item.price.display
                        delete item.price
                    }
                    return res
                })
    }
}

export default Service