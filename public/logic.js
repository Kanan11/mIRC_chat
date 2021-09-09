let socket = io()
//let name = ""
let name2 = ""

window.onload = () => {
    //name = prompt('what is your name ')
    name2 = prompt('what is your name ')

}
socket.on('message', (incoming) => {
    const list = document.getElementById("messages")
    let listItem = document.createElement("li")
    listItem.innerText = incoming.name2 + ": " + incoming.message
    list.appendChild(listItem)
})
function sendMessage() {
    const input = document.getElementById("message")
    const message = input.value
    input.value = ""
    socket.emit('message', { name2, message })
}