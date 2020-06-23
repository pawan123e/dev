import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import styled from 'styled-components'

const Alert = ({alerts}) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <AlertWrap>
    <div key={alert.id} className='alert'>
        {alert.msg}
    </div>
    </AlertWrap>
))

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert)

const AlertWrap = styled.div`
position: absolute;
bottom: 3vh;
left: 0;
width: 98vw;
height: 7vh;
z-index: 12;
position: fixed;
.alert{
    width: 35%;
    margin-left: 1rem;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
    background: #323232;
    color: white;
    opacity: 1;
    border-radius: 3px;
}
@media(max-width: 500px) {
    bottom: 0;
    width: 100vw;
    .alert{
        width: 100%;
        margin: 0;
        justify-content: center;
    }
}
`