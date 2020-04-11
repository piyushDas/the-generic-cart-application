import { checkMobileDevice } from '../utils/index.js'
import listItem from './listItem.js'

const list = data => {
    let listContent = ''
    for (const item of data) {
        listContent += listItem(item)
    }

    let template = `
    <div class="desktop-list">
        <div class="filter">
           <div>Filters</div>
           <div class="slider-container">
                <div class="flex filter-values">
                    <div id="min-price">0</div>
                    <div id="max-price">100000</div>
                </div>
                <div class="slider-range" id="slider-range"></div>
                <div class="filter-label">Price</div>
           </div>
           <div>
                <button id="apply" class="apply"> Apply </button>
           </div>
        </div>
        <div class="list">
            <div class="sort-header">
                <div>Sort By</div>
                <div id="priceHigh" class="sort-option">Price -- High Low</div>
                <div id="priceLow" class="sort-option">Price -- Low High</div>
                <div id="discount" class="sort-option">Discount</div>
            </div>
            <ul>${listContent}</ul>
        </div>
    </div>
    `
    if (checkMobileDevice()) {
        template = `
            <div class="flex filter-bar">
                <div id="sort-trigger" class="trigger">Sort</div>
                <div id="filter-trigger" class="trigger">Filter</div>
            </div>
            <ul class="flex flex-wrap">${listContent}</ul>
        `
    }
    return template
}

export default list