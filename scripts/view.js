import header from './Components/header.js'
import list from './Components/list.js'
import footer from './Components/footer.js'
import modal from './Components/modal.js'
import Cart from './Components/cart.js'

const View = function (id, data) {
    this.filteredData = [...data]
    this.cartInstance = new Cart()
    this.generateFilterValues = () => {
        let min = data[0].actual
        let max = data[0].actual
        for (const dataItem of data) {
            if (dataItem.actual < min) {
                min = dataItem.actual
            }
            if (dataItem.actual > max) {
                max = dataItem.actual
            }
        }
        this.filterParams.minPrice = min
        this.filterParams.maxPrice = max
    }
    this.filterParams = {
        sort: '',
        minPrice: 0,
        maxPrice: 0
    }
    this.sortTemplate =
        `<div> Sort Options </div>
        <ul>
            <li>
                <input class="sort-input" type="radio" name="sort" value="priceHigh" />
                Price -- High to low
            </li>
            <li>
                <input class="sort-input" type="radio" name="sort" value="priceLow" />
                Price -- Low to High
            </li>
            <li>
                <input class="sort-input" type="radio" name="sort" value="discount" />
                Price -- Discount
            </li>
        </ul>
        <div class="flex">
            <button id="cancel" type="button">Cancel</button>
            <button id="apply" type="button">Apply</button>
        </div>`

    this.filterTemplate =
        `<div> Filter Options </div>
        <div id="slider-range"></div>
        <div class="flex">
            <button id="cancel" type="button">Cancel</button>
            <button id="apply" type="button">Apply</button>
        </div>`

    this.bindTemplate = () => {
        this.generateFilterValues()
        document.getElementById(id).innerHTML = `
            ${modal()}
            ${header(this.cartInstance.renderTemplate)}
            <div id="main-content">${list(this.filteredData)}</div>
            ${footer()}
        `
        this.bindCartbehaviors()
        this.bindModalTriggers()
    }

    this.renderMainContent = () => {
        this.generateFilterValues()
        document.getElementById('main-content').innerHTML = list(this.filteredData)
        this.bindCartbehaviors()
        this.bindModalTriggers()
    }

    this.bindModalTriggers = () => {
        document.getElementById('sort-trigger').addEventListener('click', () => {
            this.showModal(this.sortTemplate)
        })

        document.getElementById('filter-trigger').addEventListener('click', () => {
            this.showModal(this.filterTemplate)
        })
    }

    this.bindModalButtons = () => {
        document.getElementById('apply').addEventListener('click', e => {
            this.filterData()
            this.closeModal()
        })

        document.getElementById('cancel').addEventListener('click', () => {
            this.closeModal()
        })

        const radioInputs = document.getElementsByClassName('sort-input')
        for (const rdInp of radioInputs) {
            rdInp.addEventListener('change', e => {
                this.filterParams.sort = e.currentTarget.value
                console.log(this.filterParams)
            })   
        }

        const that = this
        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 500,
            values: [that.filterParams.minPrice, that.filterParams.maxPrice],
            slide: function( event, ui ) {
                that.filterParams.minPrice = ui.values[0]
                that.filterParams.maxPrice = ui.values[1]
                console.log(that.filterParams)
            }
        });

        console.log($("#slider-range").slider("values", 0), $("#slider-range").slider("values", 1))
    }

    this.filterData = () => {
        let type
        let col
        this.filteredData = [...data]
        if (this.filterParams.sort === 'priceHigh') {
            col = 'actual'
            type = 'desc'
        } else if (this.filterParams.sort === 'priceLow') {
            col = 'actual'
            type = 'asc'
        } else if (this.filterParams.sort === 'discount') {
            col = 'discount'
            type = 'desc'
        }
        console.log(this.filterParams)
        this.sorList(col, type)  
        this.renderMainContent()    
    }

    this.sorList = (col, type) => {
        if (type === 'asc') {
            this.filteredData.sort((a, b) => {
                if (a[col] < b[col]) {
                    return -1;
                }
                if (b[col] < a[col]) {
                    return 1;
                }
                return 0;
            })
        } else {
            this.filteredData.sort((a, b) => {
                if (a[col] > b[col]) {
                    return -1;
                }
                if (b[col] > a[col]) {
                    return 1;
                }
                return 0;
            })
        }
    }

    this.showModal = template => {
        document.getElementById('overlay').classList.remove('hide')
        document.getElementById('modal-content').classList.remove('hide')
        document.getElementById('modal-content').innerHTML = template
        this.bindModalButtons()
    }

    this.closeModal = () => {
        document.getElementById('overlay').classList.add('hide')
        document.getElementById('modal-content').classList.add('hide')
    }

    this.bindCartbehaviors = () => {
        const addButtons = document.getElementsByClassName('cart-button')
        for (const addButton of addButtons) {
            addButton.addEventListener('click', e => {
                for (const dataitem of this.filteredData) {
                    if (e.currentTarget.id === dataitem.name) {
                        this.cartInstance.addToCart(dataitem)
                        break;
                    }
                }
            })
        }

        document.getElementById('cart-link').addEventListener('click', () => {
            this.cartInstance.renderTemplate()
            this.bindCartbehaviors()
        })

        const cartAddBtns = document.getElementsByClassName('add-item')
        for (const cartAddBtn of cartAddBtns) {
            cartAddBtn.addEventListener('click', e => {
                for (const dataitem of this.filteredData) {
                    if (e.currentTarget.parentElement.id === dataitem.name) {
                        this.cartInstance.addToCart(dataitem)
                        break;
                    }
                }
                this.cartInstance.renderTemplate()
                this.bindCartbehaviors()
            })
        }

        const cartRemoveBtns = document.getElementsByClassName('remove-item')
        for (const cartRemoveBtn of cartRemoveBtns) {
            cartRemoveBtn.addEventListener('click', e => {
                for (const dataitem of this.filteredData) {
                    if (e.currentTarget.parentElement.id === dataitem.name) {
                        this.cartInstance.removeFromCart(dataitem.name)
                        break;
                    }
                }
                this.cartInstance.renderTemplate()
                this.bindCartbehaviors()
            })
        }
    }
}

export default View