import { Link } from 'react-router-dom';
import './footer.scss'

export default function Footer() {
    let year = new Date().getFullYear;

    if(year > 2024){
        year = `2024 - ` + year;
    } else{
        year = `2024`
    }
  return (
    <div className='footer'>
        <div className='top'>
            <Link to={"/about"}>About</Link>
            <Link to={"/blog"}>Blog</Link>
            <Link to={"/help"}>Help</Link>
            <Link to={"/terms"}>Terms</Link>
            <Link to={"/places"}>About</Link>
        </div>
        <div className='bottom'>
            Copyright &copy; {year}
        </div>
    </div>
  )
}
