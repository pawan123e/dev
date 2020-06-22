import React, {useEffect} from 'react'
import {Switch, Route} from 'react-router-dom';

import Developers from '../layout/Developers'
import Alert from '../layout/Alert'
import ErrorPage from '../layout/ErrorPage'

import Register from '../auth/Register';
import Login from '../auth/Login';
import ForgotPassword from '../auth/ForgotPassword'
import RecoverPassword from '../auth/RecoverPassword'
import ResetPassword from '../auth/ResetPassword'

import Dashboard from '../dashboard/Dashboard'
import PrivateRoute from './PrivateRoute'
import CreateProfile from '../profiles/CreateProfile'
import EditProfile from '../profiles/EditProfile';
import AddExperience from '../profiles/AddExperience';
import AddEducation from '../profiles/AddEducation';
import CurrentProfile from '../profiles/CurrentProfile'
import Posts from '../posts/Post'
import PostComment from  '../posts/PostComment'
import DashboardSettings from '../dashboard/DashboardSettings'
import CommentModal from '../layout/CommentModal'
import ScrollToTop from '../ScrollToTop'

import {connect} from 'react-redux';

const Routes = ({commentModal}) => {
    
    useEffect(() => {

    }, [commentModal])

    return (
        <section>
        <Alert/>
        <CommentModal/>
        <ScrollToTop />
        <Switch>
             <Route exact path="/register" component={Register}/>
             <Route exact path="/login" component={Login}/>
             <Route exact path="/profiles" component={Developers}/>
             <Route exact path="/profiles/:id" component={CurrentProfile}/>
             <Route exact path='/forgotPassword' component={ForgotPassword}/>
             <Route exact path='/recoverPassword' component={RecoverPassword}/>
             <Route exact path='/resetPassword' component={ResetPassword}/>
             <PrivateRoute exact path="/dashboard" component={Dashboard}/>
             <PrivateRoute exact path='/dashboard/settings' component={DashboardSettings}/>
             <PrivateRoute exact path='/create-profile' component={CreateProfile}/>
             <PrivateRoute exact path='/edit-profile' component={EditProfile}/>
             <PrivateRoute exact path='/add-experience' component={AddExperience}/>
             <PrivateRoute exact path='/add-education' component={AddEducation}/>
             <PrivateRoute exact path={commentModal === 'posts' ? ['/compose/comment', '/posts'] : '/posts'} component={Posts}/>
             <PrivateRoute exact path={commentModal === 'post' ? ['/compose/comment', '/posts/:id']: '/posts/:id'} component={PostComment}/>
             <PrivateRoute exact path = '/compose/comment' component = {Dashboard}/>
             <Route component={ErrorPage}/>  
        </Switch>
        </section>
    )
}

const mapDispatchToProps = state => ({
    commentModal: state.post.commentModal,
    commentModalId: state.post.commentModalId
})

export default connect(mapDispatchToProps)(Routes)
