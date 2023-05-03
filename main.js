const ITEMS = [
    {
        id: 1,
        name: 'iPhone 14 Pro Max',
        price: 1099,
        image: 'images/iphone.jpg',
        qty: 1
    },
    {
        id: 2,
        name: 'Samsung Galaxy S23 Ultra',
        price: 1199,
        image: 'images/samsung_galaxy.jpg',
        qty: 1
    },
    {
        id: 3,
        name: 'Google Pixel 7 Pro',
        price: 899,
        image: 'images/google_pixel.jpg',
        qty: 1
    },
    {
        id: 4,
        name: 'One Plus 11 5G',
        price: 1099,
        image: 'images/one_plus.jpg',
        qty: 1
    },
    {
        id: 5,
        name: 'Macbook Air M1',
        price: 1099,
        image: 'images/Apple-MacBook-Air-M1.jpg',
        qty: 1
    },
    {
        id: 6,
        name: 'Surface Pro 9',
        price: 999,
        image: 'images/surface9.jpg',
        qty: 1
    },
]

const openBtn=document.getElementById('open-cart-btn')
const cart=document.getElementById('sidecart')
const closeBtn=document.getElementById('close-btn')
const backdrop=document.querySelector('.backdrop')
const itemsE1 = document.querySelector('.items')
const cartItems = document.querySelector('.cart-items')
const itemsNum = document.getElementById('items-num')
const subtotalPrice = document.getElementById('subtotal-price')


let cart_data = []

openBtn.addEventListener('click', openCart)
closeBtn.addEventListener('click', closeCart)
backdrop.addEventListener('click', closeCart)

renderItems()
renderCartItems()

//Open Cart
function openCart(){
    cart.classList.add('open')

    setTimeout(() => {
        backdrop.classList.add('show')
    },0)
}

//Close Cart
function closeCart(){
    cart.classList.remove('open')
    backdrop.classList.remove('show')

    setTimeout(() => {
        backdrop.style.display='none'
    },500)
}

//Add Items to Cart
function addItem(idx, itemId){
    //find same items
    const foundedItem = cart_data.find(
        (item) => item.id.toString() === itemId.toString()
    )
    if(foundedItem){
        increaseQty(itemId)
    }else{
        cart_data.push(ITEMS[idx])
    }
    updateCart()
    openCart()
}

// Remove Cart Items
function removeCartItem(itemId){
    cart_data = cart_data.filter(item => item.id != itemId)
    updateCart()
}

// Increase Qty
function increaseQty(itemId){
    cart_data = cart_data.map((item) => 
    item.id.toString() === itemId.toString()
        ? {...item, qty: item.qty + 1}
        : item
    )

    updateCart()
}

// Decrease Qty
function decreaseQty(itemId){
    cart_data = cart_data.map((item) => 
    item.id.toString() === itemId.toString()
        ? {...item, qty: item.qty > 1 ? item.qty -1 : item.qty}
        : item
    )

    updateCart()
}

//Calculate Items Number
function clacItemsNum(){
    let itemsCount=0
    cart_data.forEach( (item) => (itemsCount += item.qty))
    itemsNum.innerText = itemsCount
    
}

//Calculate Subtotal price
function calcSubtotalPrice(){
    let subtotal =0

    cart_data.forEach( (item) => (subtotal += item.price * item.qty) )

    subtotalPrice.innerText = subtotal
}

//Render Items
function renderItems(params){
    ITEMS.forEach((item, idx) =>{
        const itemE1=document.createElement('div')
        itemE1.classList.add('item')
        itemE1.onclick=() => addItem(idx, item.id)
        itemE1.innerHTML=`
            <img src="${item.image}" alt="">
            <button>Add to Cart</button>
        `
        itemsE1.appendChild(itemE1)
    })
}

//Display/Render Cart Items
function renderCartItems(){
    // remove everything from cart
    cartItems.innerHTML=`
    `
    //add new data
    cart_data.forEach(item => {
        const cartItem = document.createElement('div')
        cartItem.classList.add('cart-item')
        cartItem.innerHTML=`
            <div class="remove-item" onclick="removeCartItem(${item.id})">
            <span>&times;</span>
            </div>
            <div class="item-img">
                <img src="${item.image}" alt="">
            </div>
            <div class="item-details">
                <p>${item.name}</p>
                <strong>${item.price}</strong>
                <div class="qty">
                    <span onclick="decreaseQty(${item.id})" >-</span>
                    <strong>${item.qty}</strong>
                    <span onclick="increaseQty(${item.id})">+</span>
                </div>
            </div>
        `
        cartItems.appendChild(cartItem)
    })
}

function updateCart(){
    //render cart items with updated data
    renderCartItems()

    //Update items number in cart
    clacItemsNum()

    //Update Subtotal price
    calcSubtotalPrice()
}


// -------------------------------------------

const wrapper = document.querySelector('.wrapper');
const loginlink = document.querySelector('.login-link');
const registerlink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');



registerlink.addEventListener('click', () => {
    wrapper.classList.add('active');
} );

loginlink.addEventListener('click', () => {
    wrapper.classList.remove('active');
} );

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
} );

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
} );




// --------------------------------------------------

