import cartContainer from './cartContainer.js'
const Cart = function () {
    this.cart = []
    this.cartCount = 0
    this.findItem = id => {
        if (this.cart.length > 0) {
            for (const item of this.cart) {
                if (item.cartItem.id === id) {
                    return item
                }
            }
        }
        return 0
    }

    this.addToCart = item => {
        const selected = this.findItem(item.id) || {}
        if (selected.number > 0) {
            selected.number += 1
        } else {
            this.cart.push({
                cartItem: item,
                number: 1
            })
        }
        this.cartCount += 1
        this.renderCart()
    }

    this.removeFromCart = id => {
        let delIndex
        if (this.cart.length > 0) {
            for (const [index, item] of this.cart.entries()) {
                if (item.cartItem.id === id && item.number > 1) {
                    item.number -= 1
                } else if (item.cartItem.id === id && item.number === 1) {
                    delIndex = index
                }
            }
        }

        if (Number.isFinite(delIndex)) {
            this.cart.splice(delIndex, 1)
        }
        this.cartCount -= 1
        this.renderCart()
    }

    this.removeItemGroupFromCart = id => {
        let delIndex
        if (this.cart.length > 0) {
            for (const [index, item] of this.cart.entries()) {
                if (item.cartItem.id === id) {
                    delIndex = index
                }
            }
        }

        if (Number.isFinite(delIndex)) {
            this.cartCount -= this.cart[delIndex].number
            this.cart.splice(delIndex, 1)
        }
        this.renderCart()
    }


    this.renderCart = () => {
        document.getElementById('cart-items-count').innerHTML = this.cartCount > 0 ? this.cartCount : 0
        if (this.cart.length > 0) {
            document.getElementById('cart-items-count').classList.remove('hide')
        } else {
            document.getElementById('cart-items-count').classList.add('hide')
        }
        console.log(this.cart)
        this.getCartTotal()
        this.getCartDiscount()
    }

    this.renderTemplate = () => {
        const pricing = {
            total: this.getCartTotal(),
            discount: this.getCartDiscount()
        }
        document.getElementById('main-content').innerHTML = cartContainer(this.cart, pricing)
        document.getElementById('cart-items-count').classList.add('hide')
    }

    this.getCartTotal = () => {
        let total = 0
        for (const item of this.cart) {
            const { display } = item.cartItem
            total += (display*item.number)
        }
        return total
    }

    this.getCartDiscount = () => {
        let total = 0
        for (const item of this.cart) {
            const { display, actual } = item.cartItem
            total += ((display - actual)*item.number)
        }
        return total
    }
}

export default Cart