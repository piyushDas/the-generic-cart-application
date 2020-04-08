const cartItem = item => {
    const { number, cartItem } = item
    const { imageUrl, name, actual, display, discount } = cartItem

    const imgHeight = "auto"
    const imgWidth = "auto"
    return `
    <li class="search-list-item flex">
        <div>
            <img
                src="${imageUrl}"
                loading="lazy"
                alt="${name}"
                height=${imgHeight}
                width=${imgWidth}
            />
        </div>
        <div class="item-details">
            <div class="product-title">${name}</div>
            <div class="flex">
                <div class="product-discount-price">₹${display}</div>
                <div class="product-price">₹${actual}</div>
                <div class="product-discount">${discount} % off</div>
            </div>
            <div id="${name}" class="flex flex-center">
                <div class="remove-item"> - </div>
                <div>${number}</div>
                <div class="add-item"> + </div>
            </div>
        </div>
    </li>`
}

export default cartItem