import './leftbar.scss';
import Image1 from '../../assets/person/1.jpeg';
import Image2 from '../../assets/person/2.jpeg';
import Image3 from '../../assets/person/3.jpeg';
import Image4 from '../../assets/person/4.jpeg';
import Image5 from '../../assets/person/5.jpeg';
import Image6 from '../../assets/person/6.jpeg';

import { useAuth } from '../../hooks/useAuth';

function LeftBar(){
    const {currentUser} = useAuth();
   /*  console.log(currentUser.profilePic); */

    return(
        <div className='leftbar'>
            <div className="container">
                <div className="menu">
                   {/*  <div className="user">
                        <img src={currentUser.profilePic} alt='' />
                        <span>{currentUser.name}</span>
                    </div> */}
                    <div className="item">
                        <img src={Image1} alt='user' />
                        <span>Michel Spaniard</span>
                    </div>
                    <div className="item">
                        <img src={Image2} alt='user' />
                        <span>Austin Sprall</span>
                    </div>
                    <div className="item">
                        <img src={Image3} alt='user' />
                        <span>Izzy Wong</span>
                    </div>
                    <div className="item">
                        <img src={Image4} alt='user' />
                        <span>Ilsa Weng</span>
                    </div>
                    <div className="item">
                        <img src={Image5} alt='user' />
                        <span>Jacob Hall</span>
                    </div>
                    <div className="item">
                        <img src={Image6} alt='user' />
                        <span>Desdemona Allbright</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Your shortcuts</span>
                    <div className="item">
                        <img src={Image1} alt='user' />
                        <span>Jane Doe</span>
                    </div>
                    <div className="item">
                        <img src={Image2} alt='user' />
                        <span>Jane Doe</span>
                    </div>
                    <div className="item">
                        <img src={Image3} alt='user' />
                        <span>Jane Doe</span>
                    </div>
                    <div className="item">
                        <img src={Image4} alt='user' />
                        <span>Jane Doe</span>
                    </div>
                    <div className="item">
                        <img src={Image5} alt='user' />
                        <span>Jane Doe</span>
                    </div>
                    <div className="item">
                        <img src={Image6} alt='user' />
                        <span>Jane Doe</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Others</span>
                    <div className="item">
                        <img src={Image1} alt='user' />
                        <span>Jane Doe</span>
                    </div>
                    <div className="item">
                        <img src={Image2} alt='user' />
                        <span>Jane Doe</span>
                    </div>
                    <div className="item">
                        <img src={Image3} alt='user' />
                        <span>Jane Doe</span>
                    </div>
                    <div className="item">
                        <img src={Image4} alt='user' />
                        <span>Jane Doe</span>
                    </div>
                    <div className="item">
                        <img src={Image5} alt='user' />
                        <span>Jane Doe</span>
                    </div>
                    <div className="item">
                        <img src={Image6} alt='user' />
                        <span>Jane Doe</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LeftBar;