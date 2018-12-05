import React, { Component } from "react";
import Moment from "react-moment";
import IFrameModal from "../common/IFrameModal";
import bgVideo from "../../img/circle_talks.mp4";
import whitePaper from "../../img/Circle Whitepaper1.pdf";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import { Link } from "react-router-dom";
import uuid from "uuid/v1";

class EventbriteAPI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: []
    };
  }

  async componentDidMount() {
    const response = await fetch(
      `https://www.eventbriteapi.com/v3/users/me/owned_events/?token=${"JNM32ETYOWZBMVPRI5TU"}`
    );
    const json = await response.json();
    this.setState({ events: json.events });
  }

  render() {
    console.log(this.state);
    let events;
    if (this.state.events.length > 0) {
      events = this.state.events
        .map((event, key) => {
          return (
            <a
              key={key}
              target="_blank"
              rel="noopener noreferrer"
              href={event.url}
            >
              <div className="row">
                <p>{event.name.text}</p>
              </div>
              <div className="row">
                <small>
                  <Moment format="HH:mm D MMM YYYY" withTitle>
                    {event.start.local}
                  </Moment>
                </small>
              </div>
            </a>
          );
        })
        .reverse();
    }
    return <div className="row eventBrite-container">{events}</div>;
  }
}

class MailingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <form className="card card-body">
        {/*<div className="form-group">
          <input
            onChange={this.onChange.bind(this)}
            className="form-control form-control-lg"
            type="email"
            placeholder="Enter your email"
            name="email"
          />
          <input type="submit" className="btn" />
          <br />
          <small>
            We promise not to share your email with any third parties
          </small>
        </div>*/}
        <a
          href="https://circleofyi.us13.list-manage.com/subscribe/post?u=6ddfb2318958e6bd7e6d9f028&id=d82e567ec0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sign up to our newsletter
        </a>
      </form>
    );
  }
}

class YouTubeEmbed extends Component {
  render() {
    return (
      <iframe
        className="d-block w-100"
        src={this.props.src}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={uuid()}
      />
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
          <div className="col-md-6 col-sm-12">
            <input
              type="text"
              name="fullName"
              className="form-control"
              placeholder="Full name"
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
            />
          </div>
        </div>
        <div className="form-row py-3">
          <div className="col-md-12 col-sm-12">
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
          <div className="col-md-12 col-sm-12">
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
      // Welcome
      <div className="landing container-fluid p-0 text-center section-red">
        <div className="container-fluid section section-red text-white py-5">
          <div className="container py-5">
            <div className="row py-5">
              <div className="col-sm-6 py-5">
                <h1 className="display-2 text-left text-white pb-5">
                  Welcome to the Circle of Intrapreneurs
                </h1>
              </div>
              <div className="col-sm-6" />
            </div>
          </div>
        </div>
        {/* Circle Talks */}
        <div className="container-fluid section parallaxVideo">
          <video autoPlay muted loop>
            <source src={bgVideo} type="video/mp4" />
          </video>
        </div>
        {/* Who are the circle */}
        <div className="container-fluid section section-white">
          <div className="row py-5">
            <div className="col-md-4 col-sm-12 py-5">
              <div className="main-logo" />
            </div>
            <div className="col-md-6 col-sm-12 offset-md-1">
              <h3 className="display-4">
                Who are the Circle of Intrapreneurs?
              </h3>
              <p className=" py-4 info-text">
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
              <Link to="/register" className="btn mx-1 px-3 py-2">
                Join Us
              </Link>
              <a
                className="btn mx-1 px-3 py-2 middle-btn"
                href={whitePaper}
                download
              >
                Download Our Report
              </a>
              <a
                className="btn mx-1 px-3 py-2"
                href="https://circleofyi.us13.list-manage.com/subscribe?u=6ddfb2318958e6bd7e6d9f028&id=04cc3e3074"
                target="_blank"
                rel="noopener noreferrer"
              >
                100 Day Challenge
              </a>
            </div>
          </div>
        </div>
        <div className="container-fluid section section-red more-videos">
          <h1 className="display-5">More videos</h1>
          <div
            id="carouselExampleIndicators"
            className="carousel slide col-md-8 offset-md-2"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              />
              <li data-target="#carouselExampleIndicators" data-slide-to="1" />
              <li data-target="#carouselExampleIndicators" data-slide-to="2" />
              <li data-target="#carouselExampleIndicators" data-slide-to="3" />
              <li data-target="#carouselExampleIndicators" data-slide-to="4" />
              <li data-target="#carouselExampleIndicators" data-slide-to="5" />
              <li data-target="#carouselExampleIndicators" data-slide-to="6" />
              <li data-target="#carouselExampleIndicators" data-slide-to="7" />
              <li data-target="#carouselExampleIndicators" data-slide-to="8" />
              <li data-target="#carouselExampleIndicators" data-slide-to="9" />
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <YouTubeEmbed src="https://www.youtube.com/embed/B3WbQa_H4QM" />
              </div>
              <div className="carousel-item">
                <YouTubeEmbed src="https://www.youtube.com/embed/r47ac_6I7-Y" />
              </div>
              <div className="carousel-item">
                <YouTubeEmbed src="https://www.youtube.com/embed/_gpJzy5hDfE" />
              </div>
              <div className="carousel-item">
                <YouTubeEmbed src="https://www.youtube.com/embed/OD-9Mre-ycY" />
              </div>
              <div className="carousel-item">
                <YouTubeEmbed src="https://www.youtube.com/embed/VJ2SapCw4Vs" />
              </div>
              <div className="carousel-item">
                <YouTubeEmbed src="https://www.youtube.com/embed/O9vR7jUJq1w" />
              </div>
              <div className="carousel-item">
                <YouTubeEmbed src="https://www.youtube.com/embed/T2NIHXKIKhw" />
              </div>
              <div className="carousel-item">
                <YouTubeEmbed src="https://www.youtube.com/embed/sr9toTw725c" />
              </div>
              <div className="carousel-item">
                <YouTubeEmbed src="https://www.youtube.com/embed/N2xf_yn-R0Y" />
              </div>
              <div className="carousel-item">
                <YouTubeEmbed src="https://www.youtube.com/embed/r47ac_6I7-Y" />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        {/* Social media */}
        <div className="container-fluid section section-white">
          <h1 className="display-4 py-5">Social Media</h1>
          <div className="row">
            <div className="col-md-4">
              <h1 className="display-5">Twitter</h1>
              <TwitterTimelineEmbed
                sourceType="URL"
                screenName="circleofyi"
                options={{ height: 800 }}
              />
            </div>
            <div className="col-md-8">
              <h1 className="display-5">Events</h1>
              <EventbriteAPI />
            </div>
          </div>
        </div>

        {/* Mailing list */}
        <div className="container-fluid section section-red">
          <div className="jumbotron text-left">
            <div className="row">
              <div className="col-md-6">
                <h1 className="display-4 py-5">Want to know more?</h1>
                <h6 className="display-5">
                  <a
                    href="https://circleofyi.us13.list-manage.com/subscribe/post?u=6ddfb2318958e6bd7e6d9f028&id=d82e567ec0"
                    target="_blank"
                    className="btn"
                    rel="noopener noreferrer"
                  >
                    Join our mailing list
                  </a>
                </h6>
                <div className="collapse mt-4" id="mailingList" />
              </div>
              <div className="col-md-6">
                <div className="mailing" />
              </div>
            </div>
          </div>
        </div>

        {/* Stories form our members */}
        <div className="container-fluid section section-white stories">
          <h3 className="display-4 py-5">Stories From Our Members</h3>
          <div className="row text-justify">
            <div className="col-md-4 col-sm-12">
              <div className="story-logo roundup" />
              <h4 className="py-4">Barclays Roundup</h4>
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
            <div className="col-md-4 col-sm-12">
              <div className="story-logo homeless" />
              <h4 className="py-4">Connected Homeless</h4>
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
                className="btn text-center"
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
            <div className="col-md-4 col-sm-12">
              <div className="story-logo ticketaid" />
              <h4 className="py-4">TicketAid</h4>
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

        {/* Hubs */}
        <div className="container-fluid section section-red map-container">
          <h1 className="display-4">Our Global Hubs</h1>
          <div id="map" className="container" />
        </div>
        {/* Idea that can change the world */}
        <div className="container-fluid section section-white bulb-container">
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
                  <Link to="/register" className="no-btn">
                    Become a member
                  </Link>{" "}
                  and tell us about it
                </h6>
              </div>
            </div>
          </div>
        </div>
        {/* Social butterfly */}
        <div className="container-fluid section section-red with-stripe">
          <div className="jumbotron row text-left">
            <div className="col-md-6">
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
            <div className="col-md-6">
              <div className="speech" />
            </div>
          </div>
        </div>
        {/* Oil tanker */}
        <div className="container-fluid section section-white">
          <div className="jumbotron">
            <div className="row py-5">
              <div className="col-md-5">
                <div className="boat" />
              </div>
              <div className="col-md-6 offset-md-1 text-right">
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
        {/* feedback */}
        <div className="container-fluid section section-red">
          <h3 className="display-4 py-5">Have some feedback?</h3>
          <h3 className="display-5">Tell us how we can improve</h3>
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <FeedBackForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
