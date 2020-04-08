import Service from './service.js'
import View from './view.js'

const initiateApp = async () => {
    const dataSet = new Service()
    let itemsData = await dataSet.getData()
    const view = new View('root', itemsData.items)
    view.bindTemplate()
}

initiateApp()