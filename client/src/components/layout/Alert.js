import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import styled from 'styled-components'

const Alert = ({alerts}) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <AlertWrap>
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
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
padding-top: 12vh;
position: fixed;
width: 60%;
margin: auto;
@media(max-width: 500px) {
    width: 80%;
}
`