
document.addEventListener('DOMContentLoaded', function () {

    const imageUrls = [
        "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://media.istockphoto.com/id/1094465614/photo/speaker-addressing-group-of-females.jpg?b=1&s=612x612&w=0&k=20&c=Sh1pzYtk-cEAz-xTJt3Pv_w2GjPmvL18YkNtBuRZ1WM="
    ];

    const imageSlider = document.getElementById('imageSlider');
    let currentIndex = 0;

    function changeImage() {
        currentIndex = (currentIndex + 1) % imageUrls.length;
        imageSlider.src = imageUrls[currentIndex];
    }

    // Change the image every 3 seconds (3000 milliseconds)
    setInterval(changeImage, 3000);
});