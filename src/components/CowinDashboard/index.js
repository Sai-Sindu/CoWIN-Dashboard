// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    vaccinationCoverageList: [],
    vaccinationByGender: [],
    vaccinationByAge: [],
    status: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCovidVaccinationData()
  }

  getCovidVaccinationData = async () => {
    this.setState({status: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    const fetchedData = await response.json()
    if (response.ok) {
      this.setState({
        vaccinationCoverageList: fetchedData.last_7_days_vaccination,
        vaccinationByGender: fetchedData.vaccination_by_gender,
        vaccinationByAge: fetchedData.vaccination_by_age,
        status: apiStatusConstants.success,
      })
    } else {
      this.setState({status: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {
      vaccinationCoverageList,
      vaccinationByGender,
      vaccinationByAge,
    } = this.state
    return (
      <>
        <VaccinationCoverage
          vaccinationCoverageList={vaccinationCoverageList}
        />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-view-text">Something went wrong</h1>
    </div>
  )

  renderSwitchStatus = () => {
    const {status} = this.state

    switch (status) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin-dashboard-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo-icon"
          />
          <p className="logo-text">Co-WIN</p>
        </div>
        <h1 className="cowin-dashboard-title">CoWIN Vaccination in India</h1>
        {this.renderSwitchStatus()}
      </div>
    )
  }
}

export default CowinDashboard
