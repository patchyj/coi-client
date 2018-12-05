import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TwitterTimelineEmbed } from "react-twitter-embed";

class Chapter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chapter: {},
      country: {},
      members: [],
      leads: [],
      errors: {}
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`/chapters/${id}`)
      .then(res => {
        this.setState({
          chapter: res.data,
          country: res.data.country,
          members: res.data.members,
          leads: res.data.leads
        });
      })
      .catch(err => {
        this.setState({
          errors: err
        });
      });
  }

  render() {
    const { city, twitter_url, formed, leads, banner_pic } = this.state.chapter;
    let leadList;
    if (leads) {
      leadList = leads.map((lead, key) => {
        return (
          <div key={key}>
            <Link to={`/users/${lead.id}`}>
              {lead.first_name} {lead.last_name}
            </Link>
          </div>
        );
      });
    } else {
      leadList = "";
    }
    // console.log(leads);
    const { name } = this.state.country;
    return (
      <div className="chapter">
        <div
          className="jumbotron"
          style={{ background: `url(${banner_pic})` }}
        />
        <span className="jumbotron_h1 display-5 py-5 page-header">
          <h1 className="display-2"> {city}</h1>
          <h1 className="display-4">{name}</h1>
        </span>
        <div className="jumbotron dash bg-main-red">
          <div className="row text-center">
            <div className="col-md-4">
              <h3>Formed</h3>
              <h4 className="">{formed}</h4>
            </div>
            <div className="col-md-4">
              <h3>Members</h3>
              <h4 className="">{this.state.members.length}</h4>
            </div>
            <div className="col-md-4">
              <h3>Leads</h3>
              <h4 className="">{leadList}</h4>
            </div>
          </div>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-md-9">
              <table className="table table-striped table-sm table-hover text-center">
                <thead>
                  <tr className="thead-red">
                    <th>Name</th>
                    <th>Organisation</th>
                    <th>Joined</th>
                    <th>Projects</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.members.map((member, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <Link to={`/users/${member.id}`}>
                            {member.first_name} {member.last_name}
                          </Link>
                        </td>
                        <td>{member.organisation}</td>
                        <td>{member.joined}</td>
                        <td>{member.projects ? member.projects.length : ""}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="col-md-3">
              <TwitterTimelineEmbed
                sourceType="URL"
                screenName={twitter_url}
                options={{ height: 600 }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chapter;
