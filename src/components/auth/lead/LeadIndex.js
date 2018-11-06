import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class TestLead extends Component {
  componentWillMount() {
    const { user } = this.props.auth;

    if (!user.chapter_lead) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div>
        <h1>TEST LEAD</h1>
      </div>
    );
  }
}

// export default TestLead;

TestLead.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(TestLead);
