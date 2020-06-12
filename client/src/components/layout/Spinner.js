import React from 'react'
import spinner from './spinner.gif'
import loader from './loader.svg'
const Spinner = () => {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent:'center', marginTop: '4rem'}}>
       <img src={loader} alt='' style={{width: '200px'}}/>
       </div>
    )
}

export default Spinner