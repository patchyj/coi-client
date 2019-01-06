import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import Moment from "react-moment";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getChapter, getChapterMembers } from "../../actions/chapterActions";

class Chapter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chapter: {},
      country: {},
      members: [],
      errors: {}
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getChapter(id);
    this.props.getChapterMembers(id);
    // axios
    //   .get(`/api/chapters/${id}`)
    //   .then(res => {
    //     this.setState({
    //       chapter: res.data,
    //       country: res.data.country
    //     });
    //   })
    //   .catch(err => {
    //     this.setState({
    //       errors: err
    //     });
    //   });
    // axios
    //   .get(`/api/chapters/${id}/members`)
    //   .then(res => {
    //     this.setState({
    //       members: res.data
    //     });
    //   })
    //   .catch(err => {
    //     this.setState({
    //       errors: err
    //     });
    //   });
  }

  render() {
    const { chapter, members } = this.props.chapters;

    if (chapter && members) {
      const leads = members.filter(member => member.lead === true);

      let leadList;
      if (leads) {
        leadList = leads.map((lead, key) => {
          return (
            <div key={key}>
              <Link to={`/users/${lead._id}`}>
                {lead.firstName} {lead.lastName}
              </Link>
            </div>
          );
        });
      } else {
        leadList = "";
      }

      return (
        <div className="chapter">
          <div
            className="jumbotron"
            style={{ background: `url(${chapter.bannerPic})` }}
          />
          <span className="jumbotron_h1 display-5 py-5 page-header">
            <h1 className="display-2"> {chapter.city}</h1>
            <h1 className="display-4">{chapter.country}</h1>
          </span>
          <div className="jumbotron dash bg-main-red">
            <div className="row text-center">
              <div className="col-md-4">
                <h3>Formed</h3>
                <h4 className="">
                  <Moment format="D MMM YYYY" withtitle="true">
                    {chapter.date}
                  </Moment>
                </h4>
              </div>
              <div className="col-md-4">
                <h3>Members</h3>
                <h4 className="">{members.length}</h4>
              </div>
              <div className="col-md-4">
                <h3>Leads</h3>
                <h4 className="">{leadList}</h4>
              </div>
            </div>
          </div>
          <div
            className="jumbotron dash bg-main-red"
            style={{ height: "auto", paddingTop: "0" }}
          >
            <div className="container text-center">
              <a
                href={chapter.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: "20px" }}
              >
                <i className="fab fa-facebook fa-2x" />
              </a>
              <a
                href={chapter.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: "20px" }}
              >
                <i className="fab fa-twitter fa-2x" />
              </a>
              <a
                href={chapter.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: "20px" }}
              >
                <i className="fab fa-linkedin fa-2x" />
              </a>
              <a href="mailto:team@circleofyi.com" style={{ padding: "20px" }}>
                <i className="fas fa-envelope fa-2x" />
              </a>
            </div>
          </div>
          <div className="container table-section pt-5">
            <div className="row">
              <div className="col-md-9" style={{ paddingLeft: "0" }}>
                <table className="table table-hover text-center">
                  <thead>
                    <tr className="thead-red">
                      <th>Name</th>
                      <th>Organisation</th>
                      <th>Joined</th>
                      <th>Projects</th>
                      <th>Posts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.members.map((member, i) => {
                      return (
                        <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                          <td>
                            <Link to={`/users/${member._id}`}>
                              {member.firstName} {member.lastName}
                            </Link>
                          </td>
                          <td>{member.organisation}</td>
                          <td>
                            <Moment format="D MMM YYYY" withtitle="true">
                              {member.date}
                            </Moment>
                          </td>
                          <td>
                            {member.projects ? member.projects.length : ""}
                          </td>
                          <td>{member.posts ? member.posts.length : ""}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="col-md-3">
                <TwitterTimelineEmbed
                  sourceType="URL"
                  screenName="circleofyi"
                  options={{ height: 800 }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div className="spinner" />;
    }
  }
}

Chapter.propTypes = {
  getChapter: PropTypes.func.isRequired,
  getChapterMembers: PropTypes.func.isRequired,
  chapters: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  chapters: state.chapters,
  chapter: state.chapter,
  members: state.members
});

export default connect(
  mapStateToProps,
  { getChapter, getChapterMembers }
)(Chapter);
