function consumeMessage(event) {
    console.log(event);
    alert('Hello!');
}

// if (window.addEventListener) {
//     window.addEventListener('message', consumeMessage, false);
// } else if (window.attachEvent) {
//     window.onmessage = consumeMessage;
// }

window.onmessage = (event) => {
    console.log(event);
    alert('Hello!');
};
