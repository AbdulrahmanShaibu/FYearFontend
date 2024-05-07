
document.addEventListener("DOMContentLoaded", function () {
    const imageElementIds = ["Image1", "Image3"];
    let currentImageIndex = 0;

    function changeImage() {
        const currentImage = document.getElementById(imageElementIds[currentImageIndex]);
        if (currentImage) {
            currentImage.style.display = "none";
            currentImageIndex = (currentImageIndex + 1) % imageElementIds.length;
           // This line updates currentImageIndex to the next index in the array. It uses modulo (%) to ensure the index loops back to 0 when it reaches the end of the array.
            document.getElementById(imageElementIds[currentImageIndex]).style.display = "flex";
        } else {
            console.error(`Element with ID ${imageElementIds[currentImageIndex]} not found.`);
        }
    }
    // Change image every 2 minutes (120,000 milliseconds)
    setInterval(changeImage, 3000);
})
