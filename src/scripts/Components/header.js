const header = () => {
    return `
        <div class="app-header flex">
            <div class="brand">Star</div>
            <div class="right-panel">
                <div>
                    Search
                </div>
                <div id="cart-link">
                    Cart
                    <span id="cart-items-count">0</span>
                </div>
            </div>
        </div>
    `
}

export default header