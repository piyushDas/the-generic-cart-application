const listItem = item => {
    const { imageUrl, name, actual, display, discount } = item

    const imgHeight = "auto"
    const imgWidth = "auto"
    return `
    <li class="search-list-item">
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
            <div class="flex flex-center">
                <button id="${name}" class="cart-button">Add to cart</button>
            </div>
        </div>
    </li>`
}

export default listItem