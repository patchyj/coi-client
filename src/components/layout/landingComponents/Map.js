/*global google*/
import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
// Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getChapters } from "../../../actions/chapterActions";

import axios from "axios";
// import chapters and marker image
import chapters from "./chapters";
import markerLogo from "../../../img/logo.png";

const mapStyles = {
  width: "100%",
  height: "400px",
  margin: "auto",
  position: "relative",
  border: "1px solid white"
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
    markers: [],
    errors: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  componentDidMount() {
    this.props.getChapters();
  }
  render() {
    console.log(this.props);
    const { chapters } = this.props.chapters;
    if (chapters) {
      const markers = chapters.map((chapter, key) => {
        return (
          <Marker
            key={key}
            title={chapter.city}
            name={chapter.city}
            position={{
              lat: parseFloat(chapter.lat),
              lng: parseFloat(chapter.lng)
            }}
            icon={{
              url: markerLogo,
              anchor: new google.maps.Point(20, 20),
              scaledSize: new google.maps.Size(20, 20)
            }}
          />
        );
      });
      const mapOptions = [
        {
          featureType: "administrative",
          elementType: "geometry",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.land_parcel",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.neighborhood",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "landscape",
          stylers: [
            {
              color: "#fefefe"
            }
          ]
        },
        {
          featureType: "poi",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "labels.text",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "road",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "labels",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "transit",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "water",
          stylers: [
            {
              color: "#dd3545"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "labels.text",
          stylers: [
            {
              visibility: "off"
            }
          ]
        }
      ];
      return (
        <Map
          google={this.props.google}
          zoom={3}
          style={mapStyles}
          styles={mapOptions}
          initialCenter={{
            lat: 41.509865,
            lng: -0.118092
          }}
        >
          {markers}
        </Map>
      );
    } else {
      return <div className="spinner" />;
    }
  }
}

MapContainer.propTypes = {
  getChapters: PropTypes.func.isRequired,
  chapters: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  chapters: state.chapters
});

const WrappedContainer = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(MapContainer);

export default connect(
  mapStateToProps,
  { getChapters }
)(WrappedContainer);
