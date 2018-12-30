import React from "react";

export default () => {
  return (
    <div className="footer container-fluid bg-main-grey-darken p-5">
      <div className="container text-center">
        <a
          href="https://www.facebook.com/CircleOfYoungIntrapreneurs/"
          target="_blank"
        >
          <i className="fab fa-facebook" />
        </a>
        <a href="https://twitter.com/circleofyi?lang=en/" target="_blank">
          <i className="fab fa-twitter" />
        </a>
        <a
          href="https://www.linkedin.com/company/circle-of-young-intrapreneurs//"
          target="_blank"
        >
          <i className="fab fa-linkedin" />
        </a>
        <a
          href="https://www.instagram.com/thecircleofyi/?hl=en"
          target="_blank"
        >
          <i className="fab fa-instagram" />
        </a>
        <a
          href="https://www.youtube.com/channel/UCtM8zWux6MF5CGAXcNqLuwg"
          target="_blank"
        >
          <i className="fab fa-youtube" />
        </a>
        <a href="mailto:team@circleofyi.com">
          <i className="fas fa-envelope" />
        </a>
      </div>
      <div className="container text-center">
        <p className="text-muted py-3 mt-3">Website created by Jack McGregor</p>
        <p className="text-muted">
          <i className="far fa-copyright px-3" />
          2018 Circle of Intrapreneurs
        </p>
      </div>
    </div>
  );
};
