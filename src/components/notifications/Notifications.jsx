import './notifications.scss';

function Notifications(){
    return(
        <div className="notifications-content">
            <h3>Your latest messages</h3>
            <div className='messages'>
                <ul className='message-list'>
                    <li>Friend message</li>
                </ul>
           </div>
        </div>
    )
}
export default Notifications;