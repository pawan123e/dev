import React from 'react'
import spinner from './spinner.gif'
import loader from './loader.svg'
const Spinner = () => {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
       <img src={loader} alt='' className="img-fluid" style={{width: '200px'}}/>
       </div>
    )
}

export default Spinner