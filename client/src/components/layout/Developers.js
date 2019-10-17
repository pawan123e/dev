import React , {useEffect}from 'react'
import {connect} from 'react-redux'
import {getAllProfiles, clearProfile} from '../../actions/profile'
import Spinner from '../layout/Spinner'
import Profiles from '../profiles/Profiles'
const Developers = ({getAllProfiles, profiles, clearProfile}) => {

    useEffect(() => {
        document.title = 'Developers'
        clearProfile();
        getAllProfiles();

     },[getAllProfiles])

    return (
        <div style={{width: '60vw', margin: 'auto'}}>
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
        </div>)}

const mapStateToProps = state => ({
    profiles: state.profile.profiles
})

export default connect(mapStateToProps, {getAllProfiles, clearProfile})(Developers)
