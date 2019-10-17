import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {getCurrentProfile, deleteProfile} from '../../actions/profile'
import {setAlert} from '../../actions/alert'
import Experience from './Experience'
import Education from './Education'
import Spinner from '../layout/Spinner'
const Dashboard = ({getCurrentProfile, auth, history, profile, loading, deleteProfile}) => {
   
    useEffect(() => {
        document.title = 'Dashboard'
            getCurrentProfile(); 
    },[])

if(loading) {
    return <Spinner/>
} else {
        return ( <>
               <h1 className="large text-primary">Dashboard</h1>
               <p className="lead"> <i className="fas fa-user"/>{' '}Welcome {auth.user && auth.user.name} </p>
               { profile !== null ? 
       ( <>
        <div className="dash-buttons">
        <Link to='/edit-profile' className="btn btn-light">
          <i className="fas fa-user-circle text-primary"></i> Edit Profile
        </Link>
        <Link to='/add-experience' className="btn btn-light">
          <i className="fab fa-black-tie text-primary"></i> Add Experience</Link>
        <Link to='/add-education' className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"></i> Add Education</Link>
        </div>

        <Experience experience = {profile.experience}/>
        <Education education = {profile.education}/>
        <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteProfile(history)}>
                <i className="fas fa-user-minus"></i>
                Delete My Account
            </button>
        </div>               
    </>) : (<>
               <p>You have not yet setup a profile, please add some info</p>
               <Link to='/create-profile' className='btn btn-primary my-1'>
                   Create Profile
               </Link>
            </>)}

          </>)}}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile.profile,
    loading: state.profile.loading
})

export default connect(mapStateToProps, {getCurrentProfile, setAlert, deleteProfile})(Dashboard)
