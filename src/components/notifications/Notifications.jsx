import './notifications.scss';

function Notifications(){
    return(
        <div className="notifications-content">
            <h3>Your latest messages</h3>
            {/* <div className='messages'> */}
                <ul className='messages'>
                    <li>Friend message</li>
                    <li>Friend message</li>
                </ul>
           {/* </div> */}
        </div>
    )
}
export default Notifications;