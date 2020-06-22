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
bottom: 5vh;
left: 0;
width: 98vw;
height: 7vh;
z-index: 12;
.alert{
    width: 35%;
    margin-left: 1rem;
    margin-bottom: 2rem;
    padding: 0.7rem 1.5rem;
    background: #323232;
    color: white;
    opacity: 1;
    border-radius: 3px;
    position: fixed;
}
@media(max-width: 500px) {
    bottom: 0;
    .alert{
        width: 100%;
        height: 100%;
        margin: 0;
    }
}
`