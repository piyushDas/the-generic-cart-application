const Service = function () {
    this.getData = () => {
        return fetch('https://api.jsonbin.io/b/5e8c3aafaf7c476bc47e47a3')
                .then((response) => {
                    return response.json()
                }).then(res => {
                    res = {
                        "items": [
                          {
                            "name": "item 1",
                            "price": {
                              "actual": 200,
                              "display": 800
                            },
                            "discount": 75
                          },
                          {
                            "name": "item 2",
                            "price": {
                              "actual": 320,
                              "display": 800
                            },
                            "discount": 60
                          },
                          {
                            "name": "item 3",
                            "price": {
                              "actual": 200,
                              "display": 1000
                            },
                            "discount": 80
                          },
                          {
                            "name": "item 4",
                            "price": {
                              "actual": 800,
                              "display": 1000
                            },
                            "discount": 20
                          },
                          {
                            "name": "item 5",
                            "price": {
                              "actual": 319,
                              "display": 900
                            },
                            "discount": 64
                          },
                          {
                            "name": "item 6",
                            "price": {
                              "actual": 319,
                              "display": 900
                            },
                            "discount": 64
                          },
                          {
                            "name": "item 7",
                            "price": {
                              "actual": 900,
                              "display": 1000
                            },
                            "discount": 10
                          },
                          {
                            "name": "item 8",
                            "price": {
                              "actual": 100,
                              "display": 1000
                            },
                            "discount": 90
                          }
                        ]
                      }

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