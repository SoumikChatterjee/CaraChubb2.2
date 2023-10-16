var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
console.log(window.location.pathname);
if (window.location.pathname === '/index.html' || window.location.pathname === '/' || window.location.pathname === '/cart.html') {
    var body_1 = document.querySelector('.pro-container');
    var categoryDiv_1 = document.querySelector('.category');
    var products_1 = [];
    var getCategories = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://fakestoreapi.com/products/categories')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    data.forEach(function (category) {
                        var a = document.createElement('a');
                        a.href = "#";
                        a.classList.add('nav-link');
                        a.textContent = category.charAt(0).toUpperCase() + category.substring(1);
                        if (categoryDiv_1 !== null) {
                            categoryDiv_1.appendChild(a);
                        }
                        a.addEventListener('click', function () {
                            var filteredProducts = products_1.filter(function (product) { return product.category === category; });
                            renderProducts_1(filteredProducts);
                        });
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    var renderProducts_1 = function (products) {
        if (body_1 !== null) {
            body_1.innerHTML = '';
        }
        products.forEach(function (product) {
            var container = document.createElement('div');
            container.classList.add('pro');
            var img = document.createElement('img');
            img.src = product.image;
            img.classList.add("img-fluid");
            container.appendChild(img);
            var description = document.createElement('div');
            description.classList.add('des');
            var title = document.createElement('h5');
            title.style.fontSize = '1.6vw';
            title.textContent = product.title;
            description.appendChild(title);
            var price = document.createElement('p');
            price.textContent = "$".concat(product.price);
            description.appendChild(price);
            container.appendChild(description);
            if (body_1 !== null) {
                body_1.appendChild(container);
            }
            var cart = document.createElement('button');
            cart.style.width = '10vw';
            cart.style.height = '3vw';
            cart.style.fontWeight = 'bolder';
            cart.style.border = 'none';
            function setCartButtonState() {
                var itemCount = cartItems.reduce(function (count, itemId) {
                    return count + (itemId === product.id ? 1 : 0);
                }, 0);
                if (itemCount > 0) {
                    cart.textContent = "Added (".concat(itemCount, ")");
                    cart.style.backgroundColor = "green";
                    cart.style.color = "white";
                }
                else {
                    cart.textContent = 'Add to Cart';
                    cart.style.backgroundColor = "yellow";
                    cart.style.color = "black";
                }
            }
            setCartButtonState();
            container.appendChild(cart);
            cart.addEventListener('click', function () {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                cartItems.push(product.id);
                localStorage.setItem('cart', JSON.stringify(cartItems));
                cart.textContent = 'Added';
                cart.style.backgroundColor = "green";
                cart.style.color = "white";
                setCartButtonState();
            });
            container.addEventListener('click', function () {
                window.location.href = "./card.html?id=".concat(product.id);
            });
        });
    };
    var getProducts = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://fakestoreapi.com/products')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    products_1 = data;
                    renderProducts_1(products_1);
                    return [2 /*return*/];
            }
        });
    }); };
    getCategories();
    getProducts();
    var homeLink = document.querySelector('#home');
    if (homeLink !== null) {
        homeLink.addEventListener('click', function () {
            renderProducts_1(products_1);
        });
    }
    var searchSelect_1 = document.querySelector('#search');
    if (searchSelect_1)
        searchSelect_1.addEventListener("input", function () {
            var filteredProducts = products_1.filter(function (product) { return product.title.toLowerCase().includes(searchSelect_1.value.toLocaleLowerCase()); });
            renderProducts_1(filteredProducts);
        });
    var priceAsc = document.querySelector("#priceAscending");
    if (priceAsc)
        priceAsc.addEventListener('click', function () {
            var dup = products_1.slice();
            dup.sort(function (a, b) {
                return a.price - b.price;
            });
            console.log(dup);
            renderProducts_1(dup);
        });
    var priceDesc = document.querySelector("#priceDescending");
    if (priceDesc)
        priceDesc.addEventListener('click', function () {
            var dup = products_1.slice();
            dup.sort(function (a, b) {
                return b.price - a.price;
            });
            console.log(dup);
            renderProducts_1(dup);
        });
    var reviewDesc = document.querySelector("#reviewDescending");
    if (reviewDesc)
        reviewDesc.addEventListener('click', function () {
            console.log("reviDes");
            var dup = products_1.slice();
            dup.sort(function (a, b) {
                return b.rating.rate - a.rating.rate;
            });
            console.log(dup);
            renderProducts_1(dup);
        });
    var reviewAsc = document.querySelector("#reviewAscending");
    if (reviewAsc)
        reviewAsc.addEventListener('click', function () {
            console.log("reviDes");
            var dup = products_1.slice();
            dup.sort(function (a, b) {
                return a.rating.rate - b.rating.rate;
            });
            console.log(dup);
            renderProducts_1(dup);
        });
}
if (window.location.pathname === "/cart.html") {
    var temp_1 = document.querySelector(".cartf");
    var cartItems_1 = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartItems_1.length > 0) {
        var total_1 = 0;
        var summary_1 = {};
        for (var i = 0; i < cartItems_1.length; i++) {
            var id = cartItems_1[i];
            if (summary_1[id]) {
                summary_1[id].quantity++;
            }
            else {
                summary_1[id] = {
                    product: null,
                    quantity: 1,
                };
            }
        }
        var itemKeys_1 = Object.keys(summary_1);
        var promises = itemKeys_1.map(function (key) {
            return fetch("https://fakestoreapi.com/products/".concat(key))
                .then(function (response) { return response.json(); })
                .then(function (data) {
                summary_1[key].product = data;
                total_1 += summary_1[key].quantity * data.price;
            });
        });
        Promise.all(promises).then(function () {
            itemKeys_1.forEach(function (key) {
                var pdiv = document.createElement('div');
                pdiv.classList.add('cartItem');
                pdiv.style.display = 'flex';
                pdiv.style.justifyContent = 'space-between';
                pdiv.style.alignItems = 'center';
                var product = summary_1[key].product;
                var quantity = summary_1[key].quantity;
                var price = product.price;
                var itemTotal = quantity * price;
                var td = document.createElement('img');
                td.src = product.image;
                td.style.width = '80px';
                td.style.height = '80px';
                var tdiv = document.createElement('div');
                tdiv.style.width = '70%';
                var tt = document.createElement('h3');
                tt.textContent = product.title;
                var des = document.createElement('p');
                des.textContent = product.description;
                var quantityLabel = document.createElement('span');
                quantityLabel.style.marginRight = '10px';
                quantityLabel.textContent = 'Quantity: ' + quantity;
                var minusButton = document.createElement('button');
                minusButton.style.marginRight = '10px';
                minusButton.textContent = '-';
                minusButton.addEventListener('click', function () {
                    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
                    var index = cartItems.indexOf((product.id));
                    cartItems.splice(index, 1);
                    if (cartItems.length === 0) {
                        localStorage.setItem('cart-total', "0");
                    }
                    localStorage.setItem('cart', JSON.stringify(cartItems));
                    location.reload();
                });
                var plusButton = document.createElement('button');
                plusButton.textContent = '+';
                plusButton.addEventListener('click', function () {
                    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
                    cartItems.push(product.id);
                    localStorage.setItem('cart', JSON.stringify(cartItems));
                    location.reload();
                });
                var pr = document.createElement('p');
                pr.textContent = 'Price: $' + price.toFixed(2);
                var itemTotalLabel = document.createElement('p');
                itemTotalLabel.textContent = 'Total: $' + itemTotal.toFixed(2);
                var b = document.createElement('button');
                b.innerText = 'Remove Item';
                b.addEventListener('click', function () {
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
                if (temp_1 !== null) {
                    temp_1.appendChild(pdiv);
                }
            });
            var totalLabel = document.querySelector('#num');
            if (totalLabel !== null) {
                totalLabel.textContent = " $" + total_1.toFixed(2);
            }
        });
        Promise.all(promises).then(function () {
            var total = document.querySelector('#num');
            localStorage.setItem('cart-total', (total === null || total === void 0 ? void 0 : total.textContent) || '');
        });
    }
    function updateCartItems(cartItems, summary) {
        var newCartItems = [];
        cartItems.forEach(function (key) {
            for (var i = 0; i < summary[key].quantity; i++) {
                newCartItems.push(key);
            }
        });
        localStorage.setItem('cart', JSON.stringify(newCartItems));
    }
}
if (window.location.pathname === '/payment.html' || window.location.pathname === '/payment') {
    var sp = document.querySelector('#aeiou');
    console.log(sp);
    var cartTotal = localStorage.getItem('cart-total');
    if (sp !== null && cartTotal !== null) {
        sp.textContent = String(cartTotal);
    }
    var cardNumberInput_1 = document.querySelector('#cardNumber');
    var expityMonthInput_1 = document.querySelector('#expityMonth');
    var expityYearInput_1 = document.querySelector('#expityYear');
    var cvCodeInput_1 = document.querySelector('#cvCode');
    var payButton_1 = document.querySelector('#pay');
    console.log(payButton_1);
    if ((cardNumberInput_1 === null || cardNumberInput_1 === void 0 ? void 0 : cardNumberInput_1.value) && (expityMonthInput_1 === null || expityMonthInput_1 === void 0 ? void 0 : expityMonthInput_1.value) && (expityYearInput_1 === null || expityYearInput_1 === void 0 ? void 0 : expityYearInput_1.value) && (cvCodeInput_1 === null || cvCodeInput_1 === void 0 ? void 0 : cvCodeInput_1.value)) {
        if (payButton_1 !== null) {
            payButton_1.disabled = false;
        }
    }
    else {
        if (payButton_1 !== null) {
            payButton_1.disabled = true;
        }
    }
    [cardNumberInput_1, expityMonthInput_1, expityYearInput_1, cvCodeInput_1].forEach(function (input) {
        input === null || input === void 0 ? void 0 : input.addEventListener('input', function () {
            if ((cardNumberInput_1 === null || cardNumberInput_1 === void 0 ? void 0 : cardNumberInput_1.value) && (expityMonthInput_1 === null || expityMonthInput_1 === void 0 ? void 0 : expityMonthInput_1.value) && (expityYearInput_1 === null || expityYearInput_1 === void 0 ? void 0 : expityYearInput_1.value) && (cvCodeInput_1 === null || cvCodeInput_1 === void 0 ? void 0 : cvCodeInput_1.value)) {
                if (payButton_1 !== null) {
                    payButton_1.disabled = false;
                }
            }
            else {
                if (payButton_1 !== null) {
                    payButton_1.disabled = true;
                }
            }
        });
    });
    var pay_1 = document.querySelector("#pay");
    if (pay_1 !== null) {
        pay_1.addEventListener('click', function () {
            pay_1.disabled = true;
            pay_1.textContent = "Loading...";
            setTimeout(function () {
                window.location.href = "./successfull.html";
            }, 2000);
        });
    }
}
if (window.location.pathname === '/successfull.html') {
    var date = document.querySelector('#newdate');
    if (date !== null) {
        date.textContent = new Date().toString();
    }
    var sp = document.querySelector('#aeiou');
    console.log(sp);
    var cartTotal = localStorage.getItem('cart-total');
    if (sp !== null && cartTotal !== null) {
        sp.textContent = String(cartTotal);
    }
}
if (window.location.pathname === '/card.html') {
    var params = new URLSearchParams(window.location.search);
    var productId_1 = params.get('id');
    window.addEventListener('DOMContentLoaded', function () {
        function getProductDetails(productId) {
            return __awaiter(this, void 0, void 0, function () {
                function setCartButtonState() {
                    var itemCount = cartItems.reduce(function (count, itemId) {
                        return count + (itemId === data_1.id ? 1 : 0);
                    }, 0);
                    if (itemCount > 0) {
                        cart_1.textContent = "Added (".concat(itemCount, ")");
                        cart_1.style.backgroundColor = "green";
                        cart_1.style.color = "white";
                    }
                    else {
                        cart_1.textContent = 'Add to Cart';
                        cart_1.style.backgroundColor = "yellow";
                        cart_1.style.color = "black";
                    }
                }
                var response, data_1, proDetails, img, rightDiv, title, star, rate, ratingCount, des, price, cart_1, cartItems;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(productId !== null)) return [3 /*break*/, 3];
                            return [4 /*yield*/, fetch("https://fakestoreapi.com/products/".concat(productId))];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 2:
                            data_1 = _a.sent();
                            proDetails = document.querySelector('.product-details');
                            img = document.createElement('img');
                            img.src = data_1.image;
                            if (proDetails !== null) {
                                proDetails.appendChild(img);
                            }
                            rightDiv = document.createElement('div');
                            rightDiv.classList.add('card-rightDiv');
                            title = document.createElement('h2');
                            title.textContent = data_1.title;
                            rightDiv.appendChild(title);
                            star = document.createElement('i');
                            star.classList.add('fas', 'fa-star');
                            rate = document.createElement('span');
                            rate.textContent = "Rating-  " + data_1.rating.rate + " ";
                            rate.appendChild(star);
                            rate.classList.add('rate');
                            ratingCount = document.createElement('span');
                            ratingCount.textContent = "   ".concat(data_1.rating.count, " ratings");
                            rate.appendChild(ratingCount);
                            rightDiv.appendChild(rate);
                            des = document.createElement('p');
                            des.classList.add('card-description');
                            des.innerText = data_1.description;
                            rightDiv.appendChild(des);
                            price = document.createElement('p');
                            price.innerHTML = " $".concat(data_1.price);
                            price.classList.add('card-price');
                            rightDiv.appendChild(price);
                            cart_1 = document.createElement('button');
                            cart_1.textContent = 'Add to Cart';
                            cart_1.style.width = '10vw';
                            cart_1.style.height = '3vw';
                            cart_1.style.backgroundColor = "yellow";
                            cart_1.style.fontWeight = 'bolder';
                            cart_1.style.border = 'none';
                            rightDiv.appendChild(cart_1);
                            cartItems = JSON.parse(localStorage.getItem('cart')) || [];
                            setCartButtonState();
                            cart_1.addEventListener('click', function () {
                                cartItems.push(data_1.id);
                                localStorage.setItem('cart', JSON.stringify(cartItems));
                                cart_1.textContent = 'Added';
                                cart_1.style.backgroundColor = "green";
                                cart_1.style.color = "white";
                                setCartButtonState();
                            });
                            if (proDetails !== null) {
                                proDetails.appendChild(rightDiv);
                            }
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        getProductDetails(productId_1);
    });
}
