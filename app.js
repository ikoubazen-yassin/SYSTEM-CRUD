// Impoting Elements
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const taxis = document.querySelector("#taxis");
const ads = document.querySelector("#ads");
const discount = document.querySelector("#discount");
const total = document.querySelector("#total");
const submit_btn = document.querySelector("#submit");
const category = document.querySelector("#category");
const count = document.querySelector("#count");
const search = document.querySelector("#search");
// Global Scoop varaibeles
let tmp;
// Moode Applications
let mood = "create";
// get totall
function getTotal() {
  // Check If The Input (price) is free
  if (price.value != "") {
    let res = +price.value + +taxis.value + +ads.value - +discount.value;
    total.innerHTML = res;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}

// array products
let array_product;
// check if localstrorage is empty
if (localStorage.my_pro != null) {
  array_product = JSON.parse(localStorage.my_pro);
} else {
  array_product = [];
}

// create products

submit_btn.onclick = () => {
  const product = {
    title: title.value,
    price: price.value,
    taxis: taxis.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    category: category.value,
  };

  // Set Moode of App Depended On Mood
  if (mood === "create") {
    if (title.value && price.value != "") {
      if (count.value <= 100) {
        if (count.value > 2) {
          for (let i = 0; i < count.value; i++) {
            // push to array
            array_product.push(product);
          }
        } else {
          // push to array
          array_product.push(product);
        }
      } else {
        alert("Sorry Again, You Can't Add > 100 Products");
      }
    } else {
      alert("Sorry But , You Cant Add Product Wihout Title And Price");
    }
  } else {
    // Editing The Inputs Using Data arr

    array_product[tmp].title = title.value;
    mood = "create";
    submit_btn.innerHTML = "Create";
  }

  // save local strorage
  localStorage.setItem("my_pro", JSON.stringify(array_product)); // here have to summremizition
  // Clear all inputs
  clear_inputs();
  // Render HTML
  render_HTML();
};
// clear inputs
function clear_inputs() {
  title.value = "";
  price.value = "";
  taxis.value = "";
  ads.value = "";
  count.value = "";
  discount.value = "";
  total.innerHTML = "";
  category.value = "";
}
// render to HTML

function render_HTML() {
  let data = "";
  for (let i = 0; i < array_product.length; i++) {
    // this mean that each time will set a new pro html
    data += `
                                                          
                                                          <tr>
                                                          <td>${i + 1}</td>
                                                          <td>${
                                                            array_product[i]
                                                              .title
                                                          }</td>
                                                          <td>${
                                                            array_product[i]
                                                              .price
                                                          }</td>
                                                          <td>${
                                                            array_product[i]
                                                              .taxis
                                                          }</td>
                                                          <td>${
                                                            array_product[i].ads
                                                          }</td>
                                                          <td>${
                                                            array_product[i]
                                                              .discount
                                                          }</td>
                                                          <td>${
                                                            array_product[i]
                                                              .total
                                                          }</td>
                                                          <td>${
                                                            array_product[i]
                                                              .category
                                                          }</td>
                                                          <td><button onclick = 'Update_Data(${i})'>Update</button></td>
                                                          <td><button onclick = 'delet(${i})'>Delete</button></td>
                                                      </tr>
                                                          
                                                          
                                                          
                                                          `;
  }
  //                Set Delet all
  const deletAll = document.querySelector(".deletAll");
  if (array_product.length > 0) {
    deletAll.innerHTML = `<button onclick = 'deletAll();'>Delete All (${array_product.length})</button>`;
  } else {
    deletAll.innerHTML = "";
  }

  // append to tbody in html extension
  document.querySelector(".tbody").innerHTML = data;
}

// delet
function delet(i) {
  array_product.splice(i, 1);
  localStorage.my_pro = JSON.stringify(array_product);
  render_HTML();
}
// delet all
function deletAll() {
  localStorage.clear();
  array_product.splice(0);
  render_HTML();
}
// update
function Update_Data(id) {
  title.value = array_product[id].title;
  price.value = array_product[id].price;
  taxis.value = array_product[id].taxis;
  ads.value = array_product[id].ads;
  discount.value = array_product[id].discount;
  category.value = array_product[id].category;
  //   turn On Get Totall Function
  getTotal();
  count.style.display = "none";
  submit_btn.innerHTML = "Update";
  //  Change Moode Status
  mood = "update";
  tmp = id;
  // Up scroll
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Stay Work
render_HTML();

// sitting  Toglling
const sitting_cont = document.querySelector(" .sittings-container ");
const btn_toggler = document.querySelector(" .sittings-container .btn ");
btn_toggler.addEventListener("click", () => {
  sitting_cont.classList.toggle("active");
});
// Login Form Function

// On clik  display the popup login form
window.addEventListener("DOMContentLoaded", () => {
  // Create Overlay
  const Overlay = document.createElement("div");
  Overlay.className = "overlay";
  // Create form
  const form = document.createElement("div");
  form.className = "form-container";
  // Create Heading
  const h3 = document.createElement("h3");
  const T3 = document.createTextNode("Log In System X4S");
  // append text to h3
  h3.appendChild(T3);
  // append h3 to form
  form.appendChild(h3);
  // Create Inputs && btn
  const username = document.createElement("input");
  const password = document.createElement("input");
  const button = document.createElement("button");
  username.placeholder = "Username...";
  password.placeholder = "password...";
  button.textContent = "Log In";
  button.type = "submit";
  button.className = "lg";
  username.type = "text";
  password.type = "password";
  // appending to form
  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(button);
  // append to Over lay
  Overlay.appendChild(form);
  // append overlay to body
  document.body.appendChild(Overlay);

  button.onclick = () => {
    // check Local strorage
    if (username.value && password.value != "") {
      if (
        localStorage.getItem("user") &&
        localStorage.getItem("pass") != null
      ) {
        let u = username.value,
          p = password.value;
        // Chck user data inserted
        if (
          u === localStorage.getItem("user") &&
          p === localStorage.getItem("pass")
        ) {
          button.style.background = "green";

          setTimeout(() => {
            Overlay.remove();
          }, 2000);
        } else {
          button.style.background = "red";

          const p = document.createElement("p");
          p.style.color = "red";

          p.innerHTML = `Your username : ${username.value} and password : ${password.value} Incorrect `;
          form.appendChild(p);
          username.value = "";
          password.value = "";
        }
      } else {
        // set user and pass in localstorage
        if (username.value && password.value != "") {
          localStorage.setItem("user", username.value);
          localStorage.setItem("pass", password.value);
          // remove overlay
          Overlay.remove();
        } else {
          alert("fill the user name and password");
        }
      }
    } else {
      alert("مالك برهوش اصاحبي .كتب شي حاجة هه");
    }
  };
});
