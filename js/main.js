let nav = document.querySelector("#navBar");
let flexNav = document.querySelector("#flexNav");

if (document.body.clientWidth < 577) {
    flexNav.style.display = "none";
    let navDrop = document.createElement('select');
    nav.appendChild(navDrop);
    console.log(flexNav.children[2].innerHTML);
    for (let i = 0; i < flexNav.children.length; i++) {
        let navOption = document.createElement('option');
        navOption.innerHTML = flexNav.children[i].innerHTML;
        navDrop.appendChild(navOption);
    }
}

// document.querySelector("#flexNav")