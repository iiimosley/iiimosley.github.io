let nav = document.querySelector("#navBar");
let flexNav = document.querySelector("#flexNav");

if (document.body.clientWidth < 577) {
    flexNav.style.display = "none";
    let navDrop = document.createElement('select');
    navDrop.setAttribute("id", "dropNav");
    nav.appendChild(navDrop);
    console.log(navDrop);
    for (let i = 0; i < flexNav.children.length; i++) {
        let navOption = document.createElement('option');
        navOption.innerHTML = flexNav.children[i].innerHTML;
        navOption.value = flexNav.children[i].firstChild.attributes[0].value
        console.log(navOption);
        navDrop.appendChild(navOption);
    }
}



// document.querySelector("#flexNav")