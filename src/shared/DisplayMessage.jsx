export default function DisplayMessage(messageType,message){

    return(
        `<div class="message ${messageType}">${message}</div>`
    )    
}