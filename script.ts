console.log(window.location.pathname);

if (window.location.pathname === '/index.html' || window.location.pathname === '/' || window.location.pathname === '/cart.html') {
    const body: HTMLElement | null = document.querySelector('.pro-container');
    const categoryDiv: HTMLElement | null = document.querySelector('.category');

    let products: any[] = [];

    const getCategories = async (): Promise<void> => {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();

        data.forEach((category: string) => {
            const a = document.createElement('a');
            a.href = "#";
            a.classList.add('nav-link');
            a.textContent = category.charAt(0).toUpperCase() + category.substring(1);

            if (categoryDiv !== null) {
                categoryDiv.appendChild(a);
            }
            a.addEventListener('click', () => {
                const filteredProducts = products.filter((product: any) => product.category === category);
                renderProducts(filteredProducts);
            });
        });
    };
    var cartItems: any[] = JSON.parse(localStorage.getItem('cart')) || [];
    const renderProducts = (products: any[]): void => {
        if (body !== null) {
            body.innerHTML = '';
        }

        products.forEach((product: any) => {
            const container = document.createElement('div');
            container.classList.add('pro');

            const img = document.createElement('img');
            img.src = product.image;
            img.classList.add("img-fluid");
            container.appendChild(img);

            const description = document.createElement('div');
            description.classList.add('des');

            const title = document.createElement('h5');
            title.style.fontSize='1.6vw';
            title.textContent = product.title;
            description.appendChild(title);

            const price = document.createElement('p');
            price.textContent = `$${product.price}`;
            description.appendChild(price);

            container.appendChild(description);
            if (body !== null) {
                body.appendChild(container);
            }

            const cart = document.createElement('button');
            cart.style.width = '10vw';
            cart.style.height = '3vw';
            cart.style.fontWeight = 'bolder';
            cart.style.border = 'none';
            function setCartButtonState() {
                const itemCount = cartItems.reduce((count: number, itemId: any) => {
                    return count + (itemId === product.id ? 1 : 0);
                }, 0);
                if (itemCount > 0) {
                    cart.textContent = `Added (${itemCount})`;
                    cart.style.backgroundColor = "green";
                    cart.style.color = "white";
                } else {
                    cart.textContent = 'Add to Cart';
                    cart.style.backgroundColor = "yellow";
                    cart.style.color = "black";
                }
            }
            setCartButtonState();
            container.appendChild(cart);
            cart.addEventListener('click', () => {
                event?.stopPropagation();
                cartItems.push(product.id);
                localStorage.setItem('cart', JSON.stringify(cartItems));
                cart.textContent = 'Added';
                cart.style.backgroundColor = "green";
                cart.style.color = "white";
                setCartButtonState();
            });
            container.addEventListener('click', () => {
                window.location.href = `./card.html?id=${product.id}`;
            });
        });
    };
    const getProducts = async (): Promise<void> => {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        products = data;
        renderProducts(products);
    };
    getCategories();
    getProducts();
    const homeLink: HTMLElement | null = document.querySelector('#home');
    if (homeLink !== null) {
        homeLink.addEventListener('click', () => {
            renderProducts(products);
        });
    }
    const searchSelect=document.querySelector('#search') as HTMLInputElement;
    if(searchSelect)
    searchSelect.addEventListener("input",()=>{
        const filteredProducts = products.filter((product: any) => product.title.toLowerCase().includes(searchSelect.value.toLocaleLowerCase()));
                renderProducts(filteredProducts);

    })

    const priceAsc=document.querySelector("#priceAscending") as HTMLButtonElement;
    if(priceAsc)
    priceAsc.addEventListener('click',()=>{
        const dup=products.slice();
        dup.sort((a,b)=>{
            return a.price-b.price;
        })
        console.log(dup)
        renderProducts(dup);
    })

    const priceDesc=document.querySelector("#priceDescending") as HTMLButtonElement;
    if(priceDesc)
    priceDesc.addEventListener('click',()=>{
        const dup=products.slice();
        dup.sort((a,b)=>{
            return b.price-a.price;
        })
        console.log(dup)
        renderProducts(dup);
    })

    const reviewDesc=document.querySelector("#reviewDescending") as HTMLButtonElement;
    if(reviewDesc)
    reviewDesc.addEventListener('click',()=>{
        console.log("reviDes")
        const dup=products.slice();
        dup.sort((a,b)=>{
            return b.rating.rate-a.rating.rate;
        })
        console.log(dup)
        renderProducts(dup);
    })

    const reviewAsc=document.querySelector("#reviewAscending") as HTMLButtonElement;
    if(reviewAsc)
    reviewAsc.addEventListener('click',()=>{
        console.log("reviDes")
        const dup=products.slice();
        dup.sort((a,b)=>{
            return a.rating.rate-b.rating.rate;
        })
        console.log(dup)
        renderProducts(dup);
    })

}

if (window.location.pathname === "/cart.html") {
    const temp: HTMLElement | null = document.querySelector(".cartf");
    const cartItems: any[] = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartItems.length > 0) {
        let total = 0;
        const summary: any = {};

        for (let i = 0; i < cartItems.length; i++) {
            const id = cartItems[i];
            if (summary[id]) {
                summary[id].quantity++;
            } else {
                summary[id] = {
                    product: null,
                    quantity: 1,
                };
            }
        }

        const itemKeys = Object.keys(summary);
        const promises = itemKeys.map((key) => {
            return fetch(`https://fakestoreapi.com/products/${key}`)
                .then((response) => response.json())
                .then((data) => {
                    summary[key].product = data;
                    total += summary[key].quantity * data.price;
                });
        });

        Promise.all(promises).then(() => {
            itemKeys.forEach((key) => {
                const pdiv = document.createElement('div');
                pdiv.classList.add('cartItem');
                pdiv.style.display = 'flex';
                pdiv.style.justifyContent = 'space-between';
                pdiv.style.alignItems = 'center';

                const product = summary[key].product;
                const quantity = summary[key].quantity;
                const price = product.price;
                const itemTotal = quantity * price;

                const td = document.createElement('img');
                td.src = product.image;
                td.style.width = '80px';
                td.style.height = '80px';

                const tdiv = document.createElement('div');
                tdiv.style.width = '70%';

                const tt = document.createElement('h3');
                tt.textContent = product.title;

                const des = document.createElement('p');
                des.textContent = product.description;

                const quantityLabel = document.createElement('span');
                quantityLabel.style.marginRight = '10px';
                quantityLabel.textContent = 'Quantity: ' + quantity;

                const minusButton = document.createElement('button');
                minusButton.style.marginRight = '10px';
                minusButton.textContent = '-';
                minusButton.addEventListener('click', () => {
                    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
                    const index = cartItems.indexOf((product.id));
                    cartItems.splice(index, 1);
                    if (cartItems.length === 0) {
                        localStorage.setItem('cart-total', "0");
                    }
                    localStorage.setItem('cart', JSON.stringify(cartItems));
                    location.reload();
                });

                const plusButton = document.createElement('button');
                plusButton.textContent = '+';
                plusButton.addEventListener('click', () => {
                    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
                    cartItems.push(product.id);
                    localStorage.setItem('cart', JSON.stringify(cartItems));
                    location.reload();
                });

                const pr = document.createElement('p');
                pr.textContent = 'Price: $' + price.toFixed(2);

                const itemTotalLabel = document.createElement('p');
                itemTotalLabel.textContent = 'Total: $' + itemTotal.toFixed(2);

                const b = document.createElement('button');
                b.innerText = 'Remove Item';
                b.addEventListener('click', () => {
                    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
                    var index = cartItems.indexOf((product.id));

                    while (index != -1) {
                        cartItems.splice(index, 1);
                        index = cartItems.indexOf((product.id));
                        if (cartItems.length === 0) {
                            localStorage.setItem('cart-total', "0");
                        }
                    }
                    localStorage.setItem('cart', JSON.stringify(cartItems));
                    console.log(cartItems.length);

                    location.reload();
                });

                tt.style.marginBottom = '10px';
                tdiv.appendChild(tt);
                tdiv.appendChild(des);
                tdiv.appendChild(quantityLabel);
                tdiv.appendChild(minusButton);
                tdiv.appendChild(plusButton);
                tdiv.appendChild(pr);
                tdiv.appendChild(itemTotalLabel);
                tdiv.appendChild(b);

                pdiv.appendChild(td);
                pdiv.appendChild(tdiv);
                pdiv.style.width = '70%';
                pdiv.style.margin = 'auto';
                pdiv.style.border = '0.5px solid gray';
                pdiv.style.marginBottom = '20px';

                if (temp !== null) {
                    temp.appendChild(pdiv);
                }
            });

            const totalLabel: HTMLElement | null = document.querySelector('#num');
            if (totalLabel !== null) {
                totalLabel.textContent = " $" + total.toFixed(2);
            }
        });
        Promise.all(promises).then(() => {
            const total: HTMLElement | null = document.querySelector('#num');
            localStorage.setItem('cart-total', total?.textContent || '');
        });
    }
    function updateCartItems(cartItems: any[], summary: any): void {
        const newCartItems: any[] = [];
        cartItems.forEach((key) => {
            for (let i = 0; i < summary[key].quantity; i++) {
                newCartItems.push(key);
            }
        });
        localStorage.setItem('cart', JSON.stringify(newCartItems));
    }
}

if (window.location.pathname === '/payment.html' || window.location.pathname === '/payment') {
    const sp: HTMLElement | null = document.querySelector('#aeiou');
    console.log(sp);
    const cartTotal: string | null = localStorage.getItem('cart-total');
    if (sp !== null && cartTotal !== null) {
        sp.textContent = String(cartTotal);
    }

    const cardNumberInput: HTMLInputElement | null = document.querySelector('#cardNumber');
    const expityMonthInput: HTMLInputElement | null = document.querySelector('#expityMonth');
    const expityYearInput: HTMLInputElement | null = document.querySelector('#expityYear');
    const cvCodeInput: HTMLInputElement | null = document.querySelector('#cvCode');
    const payButton: HTMLButtonElement | null = document.querySelector('#pay');
    console.log(payButton);
    if (cardNumberInput?.value && expityMonthInput?.value && expityYearInput?.value && cvCodeInput?.value) {
        if (payButton !== null) {
            payButton.disabled = false;
        }
    } else {
        if (payButton !== null) {
            payButton.disabled = true;
        }
    }
    [cardNumberInput, expityMonthInput, expityYearInput, cvCodeInput].forEach(input => {
        input?.addEventListener('input', () => {
            if (cardNumberInput?.value && expityMonthInput?.value && expityYearInput?.value && cvCodeInput?.value) {
                if (payButton !== null) {
                    payButton.disabled = false;
                }
            } else {
                if (payButton !== null) {
                    payButton.disabled = true;
                }
            }
        });
    });

    const pay: HTMLButtonElement | null = document.querySelector("#pay") ;
    if (pay !== null) {
        pay.addEventListener('click', () => {
            pay.disabled = true;
            pay.textContent = "Loading..."
            setTimeout(() => {
                window.location.href = "./successfull.html";
            }, 2000);
        });
    }
}

if (window.location.pathname === '/successfull.html') {
    const date: HTMLElement | null = document.querySelector('#newdate');
    if (date !== null) {
        date.textContent = new Date().toString();
    }
    const sp: HTMLElement | null = document.querySelector('#aeiou');
    console.log(sp);
    const cartTotal: string | null = localStorage.getItem('cart-total');
    if (sp !== null && cartTotal !== null) {
        sp.textContent = String(cartTotal);
    }
}

if (window.location.pathname === '/card.html') {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    window.addEventListener('DOMContentLoaded', () => {
        async function getProductDetails(productId: string | null) {
            if (productId !== null) {
                const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
                const data = await response.json();
                const proDetails: HTMLElement | null = document.querySelector('.product-details');

                const img = document.createElement('img');
                img.src = data.image;
                if (proDetails !== null) {
                    proDetails.appendChild(img);
                }

                const rightDiv = document.createElement('div');
                rightDiv.classList.add('card-rightDiv');

                const title = document.createElement('h2');
                title.textContent = data.title;
                rightDiv.appendChild(title);

                const star = document.createElement('i');
                star.classList.add('fas', 'fa-star');

                const rate = document.createElement('span');
                rate.textContent = "Rating-  " + data.rating.rate + " ";
                rate.appendChild(star);
                rate.classList.add('rate');

                const ratingCount = document.createElement('span');
                ratingCount.textContent = `   ${data.rating.count} ratings`;
                rate.appendChild(ratingCount);

                rightDiv.appendChild(rate);

                const des = document.createElement('p');
                des.classList.add('card-description');
                des.innerText = data.description;
                rightDiv.appendChild(des);

                const price = document.createElement('p');
                price.innerHTML = ` $${data.price}`;
                price.classList.add('card-price');
                rightDiv.appendChild(price);

                const cart = document.createElement('button');
                cart.textContent = 'Add to Cart';
                cart.style.width = '10vw';
                cart.style.height = '3vw';
                cart.style.backgroundColor = "yellow";
                cart.style.fontWeight = 'bolder';
                cart.style.border = 'none';
                rightDiv.appendChild(cart);
                var cartItems: any[] = JSON.parse(localStorage.getItem('cart')) || [];
                function setCartButtonState() {
                    const itemCount = cartItems.reduce((count: number, itemId: any) => {
                        return count + (itemId === data.id ? 1 : 0);
                    }, 0);
                    if (itemCount > 0) {
                        cart.textContent = `Added (${itemCount})`;
                        cart.style.backgroundColor = "green";
                        cart.style.color = "white";
                    } else {
                        cart.textContent = 'Add to Cart';
                        cart.style.backgroundColor = "yellow";
                        cart.style.color = "black";
                    }
                }
                setCartButtonState();
                cart.addEventListener('click', () => {
                    cartItems.push(data.id);
                    localStorage.setItem('cart', JSON.stringify(cartItems));
                    cart.textContent = 'Added';
                    cart.style.backgroundColor = "green";
                    cart.style.color = "white";
                    setCartButtonState();
                });

                if (proDetails !== null) {
                    proDetails.appendChild(rightDiv);
                }
            }
        }
        getProductDetails(productId);
    });
}