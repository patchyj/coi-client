import React, { Component, useReducer } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import Moment from 'react-moment';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import { getProjects } from '../../actions/projectActions';
import { getChapter, getChapterMembers } from '../../actions/chapterActions';
import EditChapter from './EditChapter';

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
    this.props.getPosts();
    this.props.getProjects();
    this.props.getChapter(id);
    this.props.getChapterMembers(id);
  }

  render() {
    const { chapter, members } = this.props.chapters;
    const { posts } = this.props.posts;
    const { projects } = this.props.projects;
    const { user } = this.props.auth;
    let memberRows, leads, leadList, recipients;

    const emailButton = {
      position: 'absolute',
      right: '30px',
      top: '110px',
      borderRadius: '50%',
      background: '#f20031',
      color: 'white'
    };

    // If Chapter and Memebers loads correctly
    if (chapter && members) {
      leads = members.filter(member => member.lead === true);

      if (leads) {
        leadList = leads.map((lead, key) => {
          return (
            <div key={key}>
              <Link to={`/users/${lead._id}`}>
                {lead.firstName} {lead.lastName}
              </Link>
              <a href={`mailto:${lead.email}`}>
                <i
                  className="fas fa-envelope"
                  style={{ fontSize: '20px', paddingLeft: '15px' }}
                />
              </a>
            </div>
          );
        });
      } else {
        leadList = '';
      }

      if (members) {
        recipients = members
          .map(member => {
            return member.email;
          })
          .join(',');

        // Member Rows to go in the table
        if (posts.length > 0 && projects.length > 0) {
          memberRows = members.map((member, i) => {
            const memberPosts = posts.filter(
              post => post.user._id === member._id
            );
            const memberProjects = projects.filter(
              project => project.user._id === member._id
            );

            return (
              <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                <td>
                  <Link
                    to={`/users/${member._id}`}
                    style={{ color: '#f20031' }}
                  >
                    {member.firstName} {member.lastName}
                  </Link>
                </td>
                <td>{member.organisation}</td>
                <td>
                  <Moment format="D MMM YYYY" withtitle="true">
                    {member.date}
                  </Moment>
                </td>
                <td>{memberProjects.length}</td>
                <td>{memberPosts.length}</td>
              </tr>
            );
          });
        }
      } else {
        recipients = '';
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

          {user.admin || user.lead ? <EditChapter chapter={chapter} /> : ''}

          {user.lead ? (
            <a
              className="btn"
              style={emailButton}
              href={`mailto:${recipients}`}
            >
              <i className="fas fa-envelope" />
            </a>
          ) : (
            ''
          )}

          <div
            className="jumbotron dash bg-main-red"
            style={{ height: 'auto', paddingTop: '0' }}
          >
            <div className="container-fluid text-center">
              <a
                href={chapter.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '20px' }}
              >
                <i className="fab fa-facebook" style={{ fontSize: '25px' }} />
              </a>
              <a
                href={chapter.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '20px' }}
              >
                <i className="fab fa-twitter" style={{ fontSize: '25px' }} />
              </a>
              <a
                href={chapter.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '20px' }}
              >
                <i className="fab fa-linkedin" style={{ fontSize: '25px' }} />
              </a>
            </div>
          </div>
          <div className="container-fluid table-section pt-5">
            <div className="row" style={{ paddingLeft: '0', marginRight: '0' }}>
              <div
                className="col-md-9 table-container"
                style={{ paddingRight: '0' }}
              >
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
                  <tbody>{memberRows}</tbody>
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
  getPosts: PropTypes.func.isRequired,
  chapters: PropTypes.object.isRequired,
  getChapter: PropTypes.func.isRequired,
  getProjects: PropTypes.func.isRequired,
  getChapterMembers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  chapters: state.chapters,
  chapter: state.chapter,
  members: state.members,
  posts: state.posts,
  projects: state.projects
});

export default connect(
  mapStateToProps,
  { getPosts, getChapter, getChapterMembers, getProjects }
)(Chapter);
