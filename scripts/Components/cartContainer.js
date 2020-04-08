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
        `<div>
            <div>Pricing details</div>
            <div>
                <div> Price${data.length} : ₹${total}</div>
                <div> Discount: ₹${discount}</div>
            </div>
            <div>
                Total payable : ₹${total - discount}
            </div>
        </div>`


        template = 
            `<div class="flex">
                <ul>
                    ${cartContent}
                </ul>
                <div>
                    ${cartPricing}
                </div>
            </div>`

        if (checkMobileDevice()) {
            template =
                `<div class="">
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