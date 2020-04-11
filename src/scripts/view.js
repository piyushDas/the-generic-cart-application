import header from './Components/header.js'
import list from './Components/list.js'
import footer from './Components/footer.js'
import modal from './Components/modal.js'
import Cart from './Components/cart.js'

/**
 * View component
 *
 * @param {string} id Selector to html component
 * @param {Object} data fetched from service
 */

const View = function (id, data) {

    this.filteredData = [...data]
    this.cartInstance = new Cart()

    // before initializing the filter generating the min and max values from data set
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
        if (!Number.isFinite(this.filterParams.minPrice) && !Number.isFinite(this.filterParams.maxPrice)) {
            this.filterParams.minPrice = min
            this.filterParams.maxPrice = max
            this.filterParams.iitialMinPrice = min
            this.filterParams.initialMaxPrice = max
        }
    }

    // filter state to be referred whenever filter/sort is invoked
    this.filterParams = {
        sort: '',
        minPrice: null,
        iitialMinPrice: null,
        maxPrice: null,
        initialMaxPrice: null
    }

    
    // Template for sort popup
    this.sortTemplate =
        `<div class="modal-title"> Sort Options </div>
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

    // Template for filter popup
    this.filterTemplate =
        `<div class="modal-title"> Filter Options </div>
        <div class="slider-container">
                <div class="flex filter-values">
                    <div id="min-price">0</div>
                    <div id="max-price">100000</div>
                </div>
                <div class="slider-range" id="slider-range"></div>
                <div class="filter-label">Price</div>
           </div>
        <div class="flex">
            <button id="cancel" type="button">Cancel</button>
            <button id="apply" type="button">Apply</button>
        </div>`

    /**
     * Whenever new instance of View is created 
     * the first function to be invoked to intialize view
     * 
     * Invoked only once
     */
    this.bindTemplate = () => {
        this.generateFilterValues()
        document.getElementById(id).innerHTML = `
            ${modal()}
            ${header(this.cartInstance.renderTemplate)}
            <div id="main-content" class="main-content">${list(this.filteredData)}</div>
            ${footer()}
        `
        this.bindCartbehaviors()
        this.bindModalTriggers()
        this.bindSlider()
        this.bindHeaderButtons()
        this.bindDesktopFilters()
    }

    /**
     * the main content - either list view or cart view
     * 
     * renders list view
     * always - bind eventlisteners whenever innerHTML is rerendered
     */
    this.renderMainContent = () => {
        this.generateFilterValues()
        document.getElementById('main-content').innerHTML = list(this.filteredData)
        this.bindCartbehaviors()
        this.bindModalTriggers()
        this.bindSlider()
        this.bindHeaderButtons()
        this.bindDesktopFilters()
        if (this.cartInstance.cartCount > 0) {
            document.getElementById('cart-items-count').classList.remove("hide")
            document.getElementById('cart-items-count').innerHTML=this.cartInstance.cartCount
        }
    }

    // back to search page and input 
    this.bindHeaderButtons = () => {
        const renderFunc = () => {
            this.filterParams.minPrice = this.filterParams.iitialMinPrice
            this.filterParams.maxPrice = this.filterParams.maxPrice
            this.filterParams.sort = ""
            this.filterData()
            this.renderMainContent()
        }
        document.getElementById("logo").removeEventListener('click', renderFunc)
        document.getElementById("logo").addEventListener('click', renderFunc)

        const searchFunc = e => {
            if (e.which === 13) {
                this.searchList(e.currentTarget.value)
            }
        }
        document.getElementById("search-input").removeEventListener('keyup', searchFunc)
        document.getElementById("search-input").addEventListener('keyup', searchFunc)
    }

    this.bindDesktopFilters = () => {
        const els = document.getElementsByClassName('sort-option')
        if (els.length > 0) {
            for (const el of els) {
                el.addEventListener('click', e => {
                    this.filterParams.sort = e.currentTarget.id
                    this.filterData()
                })
            }
        }
        document.getElementById('apply').addEventListener('click', e => {
            this.filterData()
        })
        const selectedSorter = document.getElementById(this.filterParams.sort)
        if (selectedSorter)
            selectedSorter.classList.add('active')
    }

    // Modal trigger points - Sort and filter
    this.bindModalTriggers = () => {
        const sortTrigger = document.getElementById('sort-trigger')
        if (sortTrigger) {
            sortTrigger.addEventListener('click', () => {
                this.showModal(this.sortTemplate)
            })
        }
        const filterTrigger = document.getElementById('filter-trigger')
        if (filterTrigger) {
            filterTrigger.addEventListener('click', () => {
                this.showModal(this.filterTemplate)
            })
        }
    }

    // Modal button behaviors - apply and cancel
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

        this.bindSlider()
        console.log($("#slider-range").slider("values", 0), $("#slider-range").slider("values", 1))
    }

    this.bindSlider = () => {
        const that = this
        $("#slider-range").slider({
            range: true,
            min: this.filterParams.iitialMinPrice,
            max: this.filterParams.initialMaxPrice,
            values: [that.filterParams.minPrice, that.filterParams.maxPrice],
            slide: function( event, ui ) {
                that.filterParams.minPrice = ui.values[0]
                that.filterParams.maxPrice = ui.values[1]
                console.log(that.filterParams)
                document.getElementById('max-price').innerHTML = that.filterParams.maxPrice
                document.getElementById('min-price').innerHTML = that.filterParams.minPrice
            }
        });
        document.getElementById('max-price') ? document.getElementById('max-price').innerHTML = this.filterParams.maxPrice : ''
        document.getElementById('min-price') ? document.getElementById('min-price').innerHTML = this.filterParams.minPrice : ''
    }

    /**
     *  Refresh the data set of filtered data
     *  Use this.filterParams
     * 
     *  renderMainContent after every filtering
     */
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
        if (type) {
            this.sorList(col, type)
        }
        this.filteredData = this.filteredData.filter(el => {
            if (el.actual >= this.filterParams.minPrice && el.actual <= this.filterParams.maxPrice) {
                return el
            }
        })
        console.log(this.filteredData)
        this.renderMainContent()    
    }

    // Sort data set - price, discount
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

    this.searchList = val => {
        const cols = ['name']
        this.filterObj = {}
        this.filteredData = [...data]
        
        this.filteredData = this.filteredData.filter(el => {
            for (const col of cols) {
                if (el[col].toString().toLowerCase().indexOf(val.toLowerCase()) > -1) {
                    return el
                }
            }
        })

        const els = document.getElementsByClassName('search-input')
        for (const input of els) {
            input.value = ''
        }
        this.renderMainContent()
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

    /**
     * Adding event lister to cart events
     * 
     * Cart view - add and remove
     * List view - add to cart and navigate to cart
    */
    this.bindCartbehaviors = () => {
        const addButtons = document.getElementsByClassName('cart-button')
        for (const addButton of addButtons) {
            addButton.addEventListener('click', e => {
                for (const dataitem of this.filteredData) {
                    if (e.currentTarget.id === dataitem.id) {
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
                    if (e.currentTarget.parentElement.id === dataitem.id) {
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
                    if (e.currentTarget.parentElement.id === dataitem.id) {
                        this.cartInstance.removeFromCart(dataitem.id)
                        break;
                    }
                }
                this.cartInstance.renderTemplate()
                this.bindCartbehaviors()
            })
        }

        const removeGrps = document.getElementsByClassName('remove-group')
        for (const cartRemoveBtn of removeGrps) {
            cartRemoveBtn.addEventListener('click', e => {
                for (const dataitem of this.filteredData) {
                    const compId = e.currentTarget.id.split('--')
                    if (compId[1] === dataitem.id) {
                        this.cartInstance.removeItemGroupFromCart(dataitem.id)
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