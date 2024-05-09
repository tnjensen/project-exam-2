import './rightbar.scss';

function RightBar(){
    return(
        <div className='rightbar'>
            <div className="container">
                <div className="item">
                    <span>Suggestions for you</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600' alt='user' />
                            <span>Jane Doe</span>
                        </div>
                        <div className="buttons">
                            <button>Follow</button>
                            <button>Unfollow</button>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600' alt='user' />
                            <span>Jane Doe</span>
                        </div>
                        <div className="buttons">
                            <button>Follow</button>
                            <button>Unfollow</button>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <span>Latest activities</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600' alt='user' />
                            <p><span>Jane Doe</span> changed their cover picture</p>
                        </div>
                        <span className="date">
                            1 min ago
                        </span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600' alt='user' />
                            <p><span>Jane Doe</span> changed their cover picture</p>
                        </div>
                        <span className="date">
                            1 min ago
                        </span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600' alt='user' />
                            <p><span>Jane Doe</span> changed their cover picture</p>
                        </div>
                        <span className="date">
                            1 min ago
                        </span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600' alt='user' />
                            <p><span>Jane Doe</span> changed their cover picture</p>
                        </div>
                        <span className="date">
                            1 min ago
                        </span>
                    </div>
                </div>
                <div className="item">
                    <span>Online friends</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600' alt='user' />
                            <div className='online'></div>
                            <span>Jane Doe</span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600' alt='user' />
                            <div className='online'></div>
                            <span>Jane Doe</span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600' alt='user' />
                            <div className='online'></div>
                            <span>Jane Doe</span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600' alt='user' />
                            <div className='online'></div>
                            <span>Jane Doe</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RightBar;