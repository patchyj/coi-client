import React, { Component } from "react";
import MyMapComponent from "../Apis/GoogleMaps";
import IFrameModal from "../common/IFrameModal";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton
} from "react-twitter-embed";
import { Link } from "react-router-dom";

class MailingForm extends Component {
  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form className="card card-body" onSubmit={this.onSubmit.bind(this)}>
        <div className="form-group">
          <input
            className="form-control form-control-lg"
            type="email"
            placeholder="Enter your email"
          />
          <input type="submit" className="btn" />
          <br />
          <small>
            We promise not to share your email with any third parties
          </small>
        </div>
      </form>
    );
  }
}

class FeedBackForm extends Component {
  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className="form-row py-3">
          <div className="col">
            <input
              type="text"
              name="firstName"
              className="form-control"
              placeholder="First name"
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Last name"
            />
          </div>
        </div>
        <div className="form-row py-3">
          <div className="col">
            <textarea
              className="form-control"
              name="feedback"
              id=""
              rows="6"
              placeholder="Tell us your feedback"
            />
          </div>
        </div>
        <div className="form-row py-3">
          <div className="col">
            <input type="submit" className="form-control" value="Submit" />
          </div>
        </div>
      </form>
    );
  }
}

class Landing extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = process.env.PUBLIC_URL + "/sdk/tomtom.min.js";
    document.body.appendChild(script);
    script.async = true;
    script.onload = function() {
      window.tomtom.L.map("map", {
        source: "vector",
        key: "EXLLAn1majtQK1IlJ0Bw4NrZ4VO5vJKx",
        center: [51.5074, 0.1278],
        basePath: "/sdk",
        zoom: 2
      });
    };
  }
  render() {
    return (
      <div className="landing container-fluid p-0 text-center section-red">
        <div className="container-fluid section section-red text-white py-5">
          <div className="container py-5">
            <div className="row py-5">
              <div className="col-sm-6 py-5">
                <h1 className="display-3 text-left text-white">
                  Welcome to the Circle of Intrapreneurs
                </h1>
              </div>
              <div className="col-sm-6" />
            </div>
          </div>
        </div>

        <div className="container-fluid section section-white">
          <iframe
            src="https://player.vimeo.com/video/277645964"
            width="640"
            height="360"
            frameBorder="0"
            allowFullScreen
          />
        </div>

        <div className="container-fluid section section-red">
          <div className="row py-5">
            <div className="col-md-4 py-5">
              <div className="main-logo" />
            </div>
            <div className="col-md-6 offset-md-1">
              <h3 className="display-4">
                Who are the Circle of Intrapreneurs?
              </h3>
              <p className=" py-4">
                A movement designed to inspire, guide, develop & deliver
                purpose-driven business ideas from social intrapreneurs inside
                corporate organisations globally.
                <br />
                <br />
                We drive positive social change through business by creating a
                community of changemakers and supporting them to deliver their
                ideas, with tools, mentoring and advice from leading
                intrapreneurs.
                <br />
                <br />
                Join us and together we can make business a force for good.
              </p>
              <a className="btn mx-1 px-3 py-2">Join Us</a>
              <a className="btn mx-1 px-3 py-2">Download Our Report</a>
              <a className="btn mx-1 px-3 py-2">100 Day Challenge</a>
            </div>
          </div>
        </div>

        <div className="container-fluid section section-white stories">
          <h3 className="display-4 py-5">Stories From Our Members</h3>
          <div className="row text-justify">
            <div className="col-md-4">
              <div className="story-logo roundup" />
              <h4 className="py-2">Barclays Roundup</h4>
              <p className="py-3">
                RoundUp is a microdonation initiative conceived within Barclays
                by intrapreneurs Tim Heard and David Spears, which allows
                individuals to make a big difference with their small change
                using an interactive digital application.
                <br />
                The app enables customers to round up their purchases to the
                nearest pound (for example, the cost of a coffee from £2.85 to
                £3.00), up to a monthly cap, and donate this to a chosen
                charity.
              </p>
              <button
                type="button"
                className="btn"
                data-toggle="modal"
                data-target="#barclaysModal"
              >
                See More
              </button>
              <IFrameModal
                id="barclaysModal"
                title="Roundup"
                url="https://www.youtube.com/embed/cszDgqSjSwA"
              />
            </div>
            <div className="col-md-4">
              <div className="story-logo homeless" />
              <h4 className="py-2">Connected Homeless</h4>
              <p className="py-3">
                Connected Homeless is a digital platform created when he worked
                at O2 by intrapreneur Sal Mohammed. It connects donors, homeless
                people and organisations through the provision of a variety of
                services to the homeless community.
                <br />
                The platform accepts donations from private individuals,
                corporates and government entities, working through a
                crypto-currency based system. Through the consumer-facing
                (donor) app, users are able to donate their spare resources with
                the click of a button
              </p>
              <button
                type="button"
                className="btn"
                data-toggle="modal"
                data-target="#O2Modal"
              >
                See More
              </button>
              <IFrameModal
                id="O2Modal"
                title="Connected Homeless"
                url="https://www.youtube.com/embed/G3JAvO6YL8E"
              />
            </div>
            <div className="col-md-4">
              <div className="story-logo ticketaid" />
              <h4 className="py-2">TicketAid</h4>
              <p className="py-3">
                TicketAid is a corporate ticket allocation website designed to
                give employees access to exclusive tickets, that would otherwise
                go unused, whilst raising funds for charity.
                <br />
                It was brought into being by intrapreneur Matthew O'Shea at
                Thomson Reuters and works as an innovative platform connecting
                corporates, employees and charities whereby unallocated
                corporate hospitality tickets are redonated to TicketAid.
                <br />
                Employees can then buy these tickets at face value, with the
                proceeds going to an assigned charity selected by the donator of
                the ticket.
              </p>
              <button
                type="button"
                className="btn"
                data-toggle="modal"
                data-target="#TicketAidModal"
              >
                See More
              </button>
              <IFrameModal
                id="TicketAidModal"
                title="TicketAid"
                url="https://www.youtube.com/embed/G3JAvO6YL8E"
              />
            </div>
          </div>
        </div>
        <div className="container-fluid section section-red map-container">
          <h1 className="display-4">Our Global Hubs</h1>
          <div id="map" className="container" />
        </div>
        <div className="container-fluid section section-white">
          <div className="jumbotron text-left">
            <div className="row">
              <div className="col-md-6">
                <h1 className="display-4 py-5">Want to know more?</h1>
                <h6 className="display-5">
                  <a
                    data-toggle="collapse"
                    href="#mailingList"
                    role="button"
                    aria-expanded="false"
                  >
                    Join our mailing list
                  </a>
                </h6>
                <div className="collapse mt-4" id="mailingList">
                  <MailingForm />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mailing" />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid section section-red">
          <div className="jumbotron">
            <div className="row">
              <div className="col-md-6">
                <div className="lightbulb" />
              </div>
              <div className="col-md-6 text-right">
                <h1 className="display-4">
                  Have an idea that you think can change the world?
                </h1>
                <h6 className="display-5">
                  <Link to="/register">Become a member</Link> and tell us about
                  it
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid section section-white with-stripe">
          <div className="jumbotron text-left">
            <h1 className="display-4">
              Social butterfly? <br /> Tell us a story
            </h1>
            <h6 className="display-5">
              <Link to="/register" className="reach-out">
                Reach out
              </Link>{" "}
              to our community and see what the fuss is about
            </h6>
          </div>
        </div>
        <div className="container-fluid section section-red">
          <div className="jumbotron">
            <div className="row py-5">
              <div className="col-md-6">
                <div className="boat" />
              </div>
              <div className="col-md-6 text-right">
                <h1 className="display-4">
                  Want to know how to steer the oil tanker?
                </h1>
                <h6 className="display-5">
                  We have tons of resources to help people just like you!
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid section section-white">
          <div className="container">
            <h1 className="display-4 py-5">Social Media</h1>
            <div className="row">
              <div className="col-md-6">
                <h1 className="display-5">Twitter</h1>
                <TwitterTimelineEmbed
                  sourceType="URL"
                  screenName="circleofyi"
                  options={{ height: 600 }}
                />
              </div>
              <div className="col-md-6">
                <h1 className="display-5">Podcasts</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid section section-red">
          <h3 className="display-4 py-5">Have some feedback?</h3>
          <h3 className="display-5">Tell us how we can improve</h3>
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <FeedBackForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
