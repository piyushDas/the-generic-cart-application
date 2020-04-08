import { checkMobileDevice } from '../utils/index.js'
import listItem from './listItem.js'

const list = data => {
    let listContent = ''
    for (const item of data) {
        listContent += listItem(item)
    }

    let template = `
    <div class="flex">
        <div>Filter</div>
        <div>
            <div>Sort</div>
            <ul>${listContent}</ul>
        </div>
    </div>
    `
    if (checkMobileDevice()) {
        template = `
            <div class="flex filter-bar">
                <div id="sort-trigger">Sort</div>
                <div id="filter-trigger">Filter</div>
            </div>
            <ul class="flex flex-wrap">${listContent}</ul>
        `
    }
    return template
}

export default list