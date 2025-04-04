document.addEventListener("DOMContentLoaded", function() {
    const skills = document.getElementById("moving-tech");
    let clone = skills.cloneNode(true);
    skills.parentNode.appendChild(clone);
});
