const header = () => {
    return `
        <div class="app-header flex">
            <div class="brand">
                <i id="logo" class="fa fa-lg fa-star"></i>
            </div>
            <div class="right-panel">
                <div>
                    <input placeholder="Search" type="text" id="search-input">
                    <i class="fa fa-lg fa-search"></i>
                </div>
                <div id="cart-link">
                    <i class="fa fa-lg fa-shopping-cart">
                        <span id="cart-items-count" class="hide">0</span>
                    </i>
                </div>
            </div>
        </div>
    `
}

export default header