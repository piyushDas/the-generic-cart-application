import { checkMobileDevice } from '../utils/index.js'
import cartItem from './cartItem.js'

const cartContainer = (data, pricing) => {
    let cartContent = ''
    let template = ''
    const {total, discount} = pricing
    if (data.length) {
        for (const item of data) {
            cartContent += cartItem(item)
        }

        const cartPricing =
        `<div class="pricing-content">
            <div>Pricing details</div>
            <div> Price (${data.length} items) : ₹${total}</div>
            <div> Discount: ₹${discount}</div>
            <div>
                Total payable : ₹${total - discount}
            </div>
        </div>`


        template = 
            `<div class="cart-content-desktop">
                <ul>
                    ${cartContent}
                </ul>
                <div>
                    ${cartPricing}
                </div>
            </div>`

        if (checkMobileDevice()) {
            template =
                `<div class="cart-content">
                    <ul>
                        ${cartContent}
                    </ul>
                    <div>
                        ${cartPricing}
                    </div>
                </div>`
        }
    } else {
        template =
        `<div> No items in cart</div>
        `
    }
    return template
}

export default cartContainer