import React from 'react';

import './style/BadgesNew.css'
import logo from '../images/platziconf-logo.svg'
import Badge from '../components/Badge'
import BadgeForm from '../components/BadgeForm'
import api from '../api'
import LoadingPage from '../components/PageLoading'

class BadgesNew extends React.Component {
    state = {
        loading:false,
        error:null,
        form: {
            firstName:'',
            lastName:'',
            email:'',
            jobTitle:'',
            twitter:'',
        }
    }

    handleChange = e =>{
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]:e.target.value,
            }
        })
    }

    handleSudmit = async e =>{
        e.preventDefault()
        
        this.setState({loading:true, error:null})

        try{
            await api.badges.create(this.state.form)
            this.setState({loading:false})
            this.props.history.push('/badges')
        } catch(er){
            this.setState({loading:false, error:er})
        }
    }
        
    render(){
        if(this.state.loading){
            return<LoadingPage />
        }

        return(
            <React.Fragment>
                <div className="BadgeNew__hero">
                    <img className="img-fluid BadgeNew__hero-img" src={logo} alt="log" />
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <Badge 
                                firstName ={this.state.form.firstName || "FIRST_NAME"}
                                lastName ={this.state.form.lastName || 'LAST_NAME'}
                                twitter={this.state.form.twitter || 'TWITTER'}
                                jobTitle = {this.state.form.jobTitle || 'JOB_TITLE'}
                                email= {this.state.form.email || 'EMAIL'}
                                avatar ="https://www.gravatar.com/avatar?d=identicon"
                            />
                        </div>
                        <div className ="col-6">
                            <h1>New Attendant</h1>
                            <BadgeForm
                            onChange ={this.handleChange}
                            onSudmit= {this.handleSudmit}
                            formValues= {this.state.form}
                            error={this.state.error}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BadgesNew;