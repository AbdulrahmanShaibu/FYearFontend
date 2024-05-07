
document.addEventListener('DOMContentLoaded', function () {
    const images =
        [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyOEZtyAPlyknr3X-pWEcBrfVq9e_VM85AkQ&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDhPMBJ-6ZAXmt6kceQg3xRw3ytE_YtnSqHQ&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCwybNX5B2m5pnBVkmXfRY_q-0yJfCYruzag&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6oUoRX44lzRRtPWlt6ABOYgNl9Qx2W6c6hg&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvoTzwQMt3p_RwSKZ1SvFcr_agMqWrfEvOuw&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9DxkyieUMZQm2FLjkMeuxj_5lC_51GI8QEg&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX2dPV4zMAzEynb7wiz_5XHQvWfqaOgsOx6A&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzqXjVkfx7oQK0qz0gq9oLKXXyI6Skg2-UzA&usqp=CAU',
            'https://images.pexels.com/photos/7648306/pexels-photo-7648306.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/356065/pexels-photo-356065.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/935948/pexels-photo-935948.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkduQAmssHe91PGCyCNgxHdWU5Mti9kW43aQ&usqp=CAU'];

    let currentIndex = 0;

   
    function changeBackgroundImage() {
        const element = document.querySelector('.element');
        if (element) {
          element.style.backgroundImage = `url('${images[currentIndex]}')`;
          currentIndex = (currentIndex + 1) % images.length;
        }
      }
    // Call the changeBackgroundImage function initially
    changeBackgroundImage();

    // Set an interval to change the background image every 3 seconds
    setInterval(changeBackgroundImage, 3000);


    // JavaScript to populate placeholders
      // Function to automatically write placeholder text in an input field
      function autoWritePlaceholder(inputElement) {
        const placeholder = inputElement.getAttribute('data-placeholder');
        const inputText = inputElement.value;
        let currentText = '';
        let currentIndex = 0;

        const intervalId = setInterval(() => {
            if (currentIndex < placeholder.length) {
                currentText += placeholder[currentIndex];
                inputElement.setAttribute('placeholder', currentText);
                currentIndex++;
            } else {
                clearInterval(intervalId);
            }
        }, 180); // Adjust the interval for the typing speed
    }

    // Get the input elements by their IDs
    const usernameInput = document.getElementById('admin-username');
    const passwordInput = document.getElementById('admin-password');

    const userInput1=document.getElementById('firstname');
    const userInput2=document.getElementById('lastname');
    const userInput3=document.getElementById('email');
    const userInput4=document.getElementById('password');

    // Attach the autoWritePlaceholder function to input focus
    usernameInput.addEventListener('focus', () => autoWritePlaceholder(usernameInput));
    passwordInput.addEventListener('focus', () => autoWritePlaceholder(passwordInput));

    userInput1.addEventListener('focus',() => autoWritePlaceholder(userInput1));
    userInput2.addEventListener('focus',() => autoWritePlaceholder(userInput2));
    userInput3.addEventListener('focus',() => autoWritePlaceholder(userInput3));
    userInput4.addEventListener('focus',() => autoWritePlaceholder(userInput4));
});



