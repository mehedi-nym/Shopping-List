document.addEventListener("DOMContentLoaded", () => {
    const itemForm = document.getElementById("item-form");
    const itemName = document.getElementById("item-name");
    const itemPrice = document.getElementById("item-price");
    const itemList = document.getElementById("item-list");
    const totalPriceEl = document.getElementById("total-price");
    const clearAllBtn = document.getElementById("clear-all");
    const printBtn = document.getElementById("print-list");

    let items = JSON.parse(localStorage.getItem("shoppingList")) || [];

    function updateList() {
        itemList.innerHTML = '';
        let totalPrice = 0;
    
        items.forEach((item, index) => {
            const li = document.createElement("li");
    
            // Create spans for name and price
            const nameSpan = document.createElement("span");
            nameSpan.textContent = item.name;
    
            const priceSpan = document.createElement("span");
            priceSpan.textContent = `৳${item.price.toFixed(0)}`;
    
            // Create delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "X";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.dataset.index = index;
    
            // Append spans and delete button
            li.appendChild(nameSpan);
            li.appendChild(priceSpan);
            li.appendChild(deleteBtn);
    
            itemList.appendChild(li);
            totalPrice += item.price;
        });
    
        totalPriceEl.textContent = totalPrice.toFixed(2);
        localStorage.setItem("shoppingList", JSON.stringify(items));
    }
    

    itemForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = itemName.value.trim();
        const price = parseFloat(itemPrice.value);

        if (name !== '' && !isNaN(price)) {
            items.push({ name, price });
            updateList();
            itemForm.reset();
        }
    });

    itemList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const index = e.target.dataset.index;
            items.splice(index, 1);
            updateList();
        }
    });

    clearAllBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear the entire list?")) {
            items = [];
            updateList();
        }
    });

    printBtn.addEventListener("click", () => {
        const dateEl = document.getElementById("created-date");
        const now = new Date();
        dateEl.textContent = `Created on: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    
        // Delay print slightly to ensure DOM update
        setTimeout(() => window.print(), 100);
    });

    updateList();
});




