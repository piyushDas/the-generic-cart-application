const cartItem = item => {
    const { number, cartItem } = item
    const { name, actual, display, discount } = cartItem

    const imgHeight = "auto"
    const imgWidth = "auto"
    return `
    <li class="cart-list-item flex">
        <div>
            <img
                src="https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90"
                loading="lazy"
                alt="${name}"
                height=${imgHeight}
                width=${imgWidth}
            />
        </div>
        <div class="item-details">
            <div class="product-title">${name}</div>
            <div class="flat-list">
                <div class="flex">
                    <div class="product-price">₹${actual}</div>
                    <div class="product-discount-price">₹${display}</div>
                    <div class="product-discount">${discount}%off</div>
                </div>
                <div id="${name}" class="controls">
                    <div class="remove-item"> - </div>
                    <div>${number}</div>
                    <div class="add-item"> + </div>
                </div>
                <div id="delete">Remove</div>
            </div>
        </div>
    </li>`
}

export default cartItem