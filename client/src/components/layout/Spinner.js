import React from 'react'
import spinner from './spinner.gif'
const Spinner = () => {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
       <img src={spinner} alt='' className="img-fluid" style={{width: '500px'}}/>
       </div>
    )
}

export default Spinner