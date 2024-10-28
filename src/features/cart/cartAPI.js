export function addToCart(items) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:8080/cart ", {
      method: "POST",
      body: JSON.stringify(items),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart?user=" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCart(item) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:8080/cart/" + item.id, {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve, reject) => {
    await fetch("http://localhost:8080/cart/" + itemId, {
      method: "DELETE",
      body: JSON.stringify(itemId),
      headers: { "content-type": "application/json" },
    });
    resolve({ data: { id: itemId } });
  });
}
