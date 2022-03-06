const yes = document.querySelector(".yes");
const no = document.querySelector(".no");

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    document.querySelector(".price_total").innerHTML = ` ${
        Number(window.location.href.split("?")[1]).toLocaleString()
    } تومان`;
});

yes.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:3000/payment/?result=yes";
});
no.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:3000/payment/?result=no";
});
