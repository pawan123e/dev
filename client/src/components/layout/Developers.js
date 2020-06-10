import React , {useEffect}from 'react'
import {connect} from 'react-redux'
import {getAllProfiles, clearProfile} from '../../actions/profile'
import Spinner from '../layout/Spinner'
import Profiles from '../profiles/Profiles'
import styled from 'styled-components'

const Developers = ({getAllProfiles, profiles, clearProfile}) => {

    useEffect(() => {
        document.title = 'Developers'
        clearProfile();
        getAllProfiles();

     },[getAllProfiles])

    return (
        <DevWrap>
           <h1 className="large text-primary">Developers</h1>
           <p className="lead">
           <i className="fab fa-connectdevelop"></i> Browse and connect with developers
           </p>
           {profiles.length === 0 ? <Spinner/> : 
           <div className="profiles">
          {  
              profiles.map(profile => <Profiles profile = {profile} key={profile._id}/> ) 
          }
           </div>
           }
        </DevWrap>)}

const mapStateToProps = state => ({
    profiles: state.profile.profiles
})

export default connect(mapStateToProps, {getAllProfiles, clearProfile})(Developers)

const DevWrap = styled.div`
width: 100%;
padding-left: 10%;
padding-right: 10%;
padding-top: 15vh;
padding-bottom: 10vh;
background: whitesmoke;
min-height: 100vh;
.profiles{
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax(300px, 1fr) );
    align-items: center;
    justify-content: center;
    grid-gap: 4rem;
}
@media(max-width: 700px) {
    padding-top: 20vh;
}
` 