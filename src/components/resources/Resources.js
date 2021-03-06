import React, { Component } from 'react';
import ResourceModal from '../common/ResourceModal';
import resources from './FiveC';
import timAndDavid from '../../img/roundup_team.png';
import Carousel from '../common/Carousel';
import projectLifecycle from './slideshows/ProjectLifecycle';
import uuidv1 from 'uuid/v1';

class ResourceTable extends Component {
  render() {
    const rows = this.props.data.map((data, key) => {
      let download;
      if (typeof data.download === 'string') {
        download = (
          <a href={data.download} download>
            <i className="fas fa-download" />
          </a>
        );
      } else {
        download = '';
      }
      return (
        <tr key={'row' + key} className="bg-main-white">
          <th scope="row">
            <a data-toggle="modal" data-target={`#modal-${data.id}`}>
              {data.resource}
            </a>
            <ResourceModal data={data} id={uuidv1()} />
          </th>
          <td>{data.description}</td>
          <td className="text-center">{download}</td>
        </tr>
      );
    });

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Resource</th>
            <th scope="col">Description</th>
            <th className="text-center" scope="col">
              Download
            </th>
          </tr>
        </thead>
        <tbody>
          {/* LOOP THROUGH THE RESOURCES DEPENDING ON THE 'C' PROPS */}
          {rows}
        </tbody>
      </table>
    );
  }
}

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgImage: 0,
      // bgText: 200,
      bgTrigger: null,
      numPages: 22,
      pageNumber: 1
    };
  }

  componentDidMount() {
    // const bgTrigger = document.getElementById('bgTrigger');
    // // const bgText = document.getElementById('bgText');
    // this.setState({
    //   bgImage: `${Math.floor(bgTrigger.getBoundingClientRect().top)}`
    //   // bgText: `${Math.floor(bgText.getBoundingClientRect().top)}`
    // });
    // window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    // window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const bgTrigger = document.getElementById('bgTrigger');
    this.setState({
      bgTrigger: bgTrigger.getBoundingClientRect().top,
      bgImage: `${Math.floor(bgTrigger.getBoundingClientRect().top)}`
      // bgText: `${Math.floor(bgTrigger.getBoundingClientRect().top * 0.45)}`
    });
  };

  render() {
    const tabs = resources.map((resource, key) => {
      return (
        <a
          className={`nav-item nav-link ${key === 0 ? 'active' : ''}`}
          id={`nav-${key}-tab`}
          data-toggle="tab"
          href={`#nav-${key}`}
          role="tab"
          key={key}
          aria-controls={`nav-${key}`}
          aria-selected="true"
        >
          {resource.name}
        </a>
      );
    });
    const panels = resources.map((resource, key) => {
      return (
        <div
          className={`tab-pane fade show ${key === 0 ? 'active' : ''}`}
          id={`nav-${key}`}
          role="tabpanel"
          aria-labelledby={`nav-${key}-tab`}
          key={`pane-${key}`}
        >
          <div className="table-container">
            <ResourceTable data={resources[key].data} />
          </div>
        </div>
      );
    });
    return (
      <div className="resources">
        <div
          className="background"
          id="bgImage"
          style={{ top: `${this.state.bgImage}px` }}
        />
        <div className="background-text container p-3 text-left">
          <h1>
            <span className="display-4">Welcome to The Circle!</span>
          </h1>
          <p className="p-responsive introText">
            Welcome to the inner circle! You are joining a movement of over 5000
            inspiring leaders around the world trying to make business a
            <a href="">#forceforgood</a> by <a href="">#dowelldogood</a>{' '}
          </p>
        </div>
        <div className="jumbotron jumbotron-fluid bg-main-white" id="bgTrigger">
          <div className="container py-5">
            <div className="col-md-10 offset-md-1 col-sm-12">
              <p className="p-responsive text-justify">
                Here we aim to arm you with the tools and techniques required to
                be an effective social intrapreneur based on our own journey and
                the journeys of other inspiring intrapreneurs from the Circle
                network. Below you will find a whole bunch of useful templates
                you can utilise to help you define, develop and deliver ideas
                which aim to profitably-do-good; certainly we wish we had these
                kind of tools at our disposal when we started our own journey!
                We will look to regularly update these templates and add new
                ones so do check in regularly{' '}
              </p>
              <p className="p-responsive text-justify">
                If you are earlier on in your journey, and are just conceiving
                an idea, then please use the project submission form under the
                "projects" tab so we can link you into your nearest Circle
                chapter lead who can give you feedback and help you to both
                shape your idea and take your first steps as a{' '}
                <strong className="bold">social intrapreneur</strong>.{' '}
              </p>
              <p className="p-responsive text-justify">
                We wish you every success with your journey; we'll be here to
                help every step of the way{' '}
              </p>
              <p className="p-responsive text-justify">
                Tim, David and the Circle Team.{' '}
              </p>
              <div className="row">
                <div className="col-4 offset-4">
                  <img
                    src={timAndDavid}
                    alt="The Circle Team"
                    className="circleTeam img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid py-5 bg-main-red">
          <div className="container p-5">
            <Carousel data={projectLifecycle} />
          </div>
        </div>
        <div className="container-fluid pt-5 bg-main-white">
          <h1 className="display-4 text-center">Your Toolkit</h1>
          <div className="row" style={{ marginRight: '0' }}>
            <small className="col-md-8 offset-md-2 my-5">
              DISCLAIMER: [The Circle of Young Intrapreneurs] provides these
              materials for not-for-profit use only. By downloading these
              materials, you agree not to use the content for profit-making
              purposes. If you would like to use these materials for a
              profit-making purpose, such as in a corporate program, please
              contact{' '}
              <a href="mailtp:team@circleofyi.com">team@circleofyi.com.</a>
            </small>
          </div>
          <div className="container">
            {/* NAV */}
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                {tabs}
              </div>
            </nav>
            {/* CONTENT */}
            <div className="tab-content" id="nav-tabContent">
              {panels}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Resources;
