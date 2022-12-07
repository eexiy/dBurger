// база данных о бургерах в виде объекта

const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: "images/products/burger-1.png",
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: "images/products/burger-2.png",
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: "images/products/burger-3.png",
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: "images/products/burger-4.png",
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    }
}


const navBarBasket = document.querySelector('.nav__basket-btn'),
    dropDown = document.querySelector('.nav__basket-dropdown'),
    closeBtn = document.querySelector('.nav__basket-close'),
    basketCheckList = document.querySelector('.nav__basket-checklist'),
    totalPriceBasket = document.querySelector('.nav__basket-totalPrice'),
    navBasketCount = document.querySelector('.nav__basket-count'),
    orderBtn = document.querySelector('.nav__basket-dropdownBottom'),
    productBtns = document.querySelectorAll('.product__list-basket');


productBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        plusOrMinus(this)
    })
})

navBarBasket.addEventListener('click', () => {
    dropDown.classList.add('active')
})

closeBtn.addEventListener('click', () => {
    dropDown.classList.remove('active')
})



function plusOrMinus(element) {
    let parent = element.closest('.product__list-card')
    let parentId = parent.getAttribute('id')

    product[parentId].amount++
    basket()
}


function basket() {
    const productArray = []

    for (let key in product) {
        let totalCount = 0;
        const productObj = product[key]
        const productCard = document.querySelector(`#${productObj.name.toLowerCase()}`),
            cardIndecator = productCard.querySelector('.product__list-count');

        if (productObj.amount) {
            productArray.push(productObj)
            totalCount += productObj.amount
            cardIndecator.classList.add('active')
            cardIndecator.innerHTML = productObj.amount
        } else {
            cardIndecator.classList.remove('active')
            cardIndecator.innerHTML = 0
        }
    }
    basketCheckList.innerHTML = ''

    productArray.forEach((obj, i) => {
        basketCheckList.innerHTML += cardItemChecklist(obj)
    })

    const allCount = totalCount()
    if (allCount) {
        navBasketCount.classList.add('active')
    } else {
        navBasketCount.classList.remove('active')
    }
    navBasketCount.innerHTML = allCount

    totalPriceBasket.innerHTML = totalPrice()
}


function totalCount() {
    let total = 0
    for (let key in product) {
        total += product[key].amount
    }
    return total
}

function cardItemChecklist(data) {
    const {
        name,
        amount,
        img,
        price
    } = data

    return `
<div class="nav__basket-product">
    <img width='70px' src=${img} alt="burger">
    <div class="nav__basket-info">
        <p class="nav__basket-text">${name}</p>
        <p class="nav__basket-price">${price} сум</p>
    </div>
    <div class="nav__basket-amount" id="${name.toLowerCase()}__card">
        <button class="nav__basket-minus button-symbol" data-symbol='-'>-</button>
        <span>${amount}</span>
        <button class="nav__basket-plus button-symbol "  data-symbol='+'>+</button>
    </div>
</div>
    `
}

function totalPrice() {
    let price = 0
    for (const key in product) {
        price += product[key].totalSum
    }
    return price
}

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('button-symbol')) {
        const symbol = e.target.getAttribute('data-symbol')
        const parent = e.target.closest('.nav__basket-amount')
        if (parent) {
            const idParent = parent.getAttribute('id').split('__')[0]
            if (symbol == '-') product[idParent].amount--
            else if (symbol == '+') product[idParent].amount++
            basket()
        }
    }
})

const printBody = document.querySelector('.print__body')
printFooter = document.querySelector('.print__footer')
print = document.querySelector('.print')

orderBtn.addEventListener('click', () => {
    printBody.innerHTML = ''
    for (const key in product) {
        const {
            amount,
            totalSum,
            name
        } = product[key]
        if (amount) {
            printBody.innerHTML += `
                <div class="print__body-item">
                    <p>
                        <span>Бургер: ${name}</span>
                        <span>${amount} шт.</span>
                    </p>
                    <p>Общая сумма ${totalSum}</p>
                </div>            
            `
            print.classList.add('active')
        }
    }

    setTimeout(() => {
        print.classList.remove('active')
    }, 3500);
    basketCheckList.innerHTML = ''
    totalPriceBasket.innerHTML = ''
    const cardIndecator = document.querySelectorAll('.product__list-count');
    cardIndecator.forEach(counter => {
        for (let key in product) {
            product[key].amount = 0
            navBasketCount.classList.remove('active')
        }
        counter.classList.remove('active')
    })
})