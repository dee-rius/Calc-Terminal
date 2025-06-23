const showFunctions = document.getElementById("show-functions");
const functionsDropdown = document.getElementById("functions-dropdown");

showFunctions.addEventListener("click", () => {
    if (functionsDropdown.style.display == "none") {
        functionsDropdown.classList.remove("exit-anim");
        functionsDropdown.classList.add("enter-anim");
        functionsDropdown.style.display = "flex";

        showFunctions.textContent = "Click To Hide Functions";
    }
    else {
        functionsDropdown.classList.add("enter-anim");
        functionsDropdown.classList.add("exit-anim");

        setTimeout(() => { functionsDropdown.style.display = "none"; showFunctions.textContent = "Click To Show Functions" }, 170);
    }
});