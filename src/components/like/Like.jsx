import './like.scss';

function Like({like}){
    const symbol = like.symbol;

    return(
        <div className='likes'>
           <div className='emoji'>{symbol}</div>
        </div>
    )
}
export default Like;