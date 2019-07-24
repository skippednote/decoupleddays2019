// const input = document.querySelector("inpot");
// input.value = "hello";

// document.addEventListener("mouseover", e => {
//     e.clientX;
//     e.keyCode;
// });

type Message = string | string[] | false;
function setMessage(message: Message) {
    if (typeof message === "string") {
        document.body.textContent = message
    } else if (Array.isArray(message)) {
        document.body.textContent = message[0]
    } else {
        message
    }
}

export default "";
