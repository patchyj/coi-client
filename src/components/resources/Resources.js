import React, { Component } from "react";
import SlideShow from "react-slideshow-ui";
import {
  Tabs,
  Tab,
  TabContainer,
  TabContent,
  TabPane,
  Row,
  Col,
  Nav,
  NavItem,
  Table
} from "react-bootstrap";

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        { tab1: { active: true, text: "Convert" } },
        { tab2: { active: false, text: "Create" } },
        { tab3: { active: false, text: "Construct" } },
        { tab4: { active: false, text: "Commit" } },
        { tab5: { active: false, text: "Control" } }
      ]
    };
    // this.tabToggle = this.tabToggle.bind(this);
  }
  //
  // tabToggle(tabIndex) {
  //   let tabs = this.state.tabs;
  //   tabs[tabIndex] = true;
  //   tabs.map((tab, index) => {
  //     if (index !== tabIndex) tab.active = false;
  //   });
  //   this.setState(tabs);
  // }

  addActiveClass() {
    this.setState({
      isActive: !this.state.isActive
    });
  }
  render() {
    const tableRows = (
      <tr>
        <td className="text-center">Resource</td>
        <td className="text-center">Description</td>
        <td className="text-center">Download</td>
      </tr>
    );

    return (
      <div className="resources">
        <div className="container-fluid">
          <div className="row bg-main-grey-darken">
            <div className="col-md-12 py-5">
              <h1 className="display-4 text-center py-5">Resources</h1>
            </div>
          </div>
          <div className="row bg-main-grey">
            <div className="col-md-6 offset-md-3 py-5 display-5">
              <p className="display-4-5 text-center py-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi
                rem, velit fuga recusandae, voluptatibus autem ut molestiae
                ipsam voluptatum nemo, sed cupiditate iusto nulla totam!
                Voluptas laudantium, aperiam eaque doloribus.
              </p>
            </div>
          </div>
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="1"
            style={{ marginBottom: "-25px" }}
          >
            <Row>
              <Col sm={2}>
                <Nav bsStyle="pills" stacked>
                  <NavItem className="list-group-item text-center" eventKey="1">
                    Convert
                  </NavItem>
                  <NavItem className="list-group-item text-center" eventKey="2">
                    Create
                  </NavItem>
                  <NavItem className="list-group-item text-center" eventKey="3">
                    Construct
                  </NavItem>
                  <NavItem className="list-group-item text-center" eventKey="4">
                    Commit
                  </NavItem>
                  <NavItem className="list-group-item text-center" eventKey="5">
                    Control
                  </NavItem>
                </Nav>
              </Col>
              <Col sm={8} className="bg-main-white py-5">
                <Tab.Content animation>
                  <Tab.Pane eventKey="1">
                    <h1 className="text-center">Convert</h1>
                    <Table responsive striped hover>
                      <thead>
                        <tr>
                          <th className="text-center">Resource</th>
                          <th className="text-center">Description</th>
                          <th className="text-center">Download</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows}
                        {tableRows}
                      </tbody>
                    </Table>
                  </Tab.Pane>
                  <Tab.Pane eventKey="2">
                    <h1 className="text-center">Create</h1>
                    <Table responsive striped hover>
                      <thead>
                        <tr>
                          <th className="text-center">Resource</th>
                          <th className="text-center">Description</th>
                          <th className="text-center">Download</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows}
                        {tableRows}
                      </tbody>
                    </Table>
                  </Tab.Pane>
                  <Tab.Pane eventKey="3">
                    <h1 className="text-center">Construct</h1>
                    <Table responsive striped hover>
                      <thead>
                        <tr>
                          <th className="text-center">Resource</th>
                          <th className="text-center">Description</th>
                          <th className="text-center">Download</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows}
                        {tableRows}
                      </tbody>
                    </Table>
                  </Tab.Pane>
                  <Tab.Pane eventKey="4">
                    <h1 className="text-center">Commit</h1>
                    <Table responsive striped hover>
                      <thead>
                        <tr>
                          <th className="text-center">Resource</th>
                          <th className="text-center">Description</th>
                          <th className="text-center">Download</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows}
                        {tableRows}
                      </tbody>
                    </Table>
                  </Tab.Pane>
                  <Tab.Pane eventKey="5">
                    <h1 className="text-center">Control</h1>
                    <Table responsive striped hover>
                      <thead>
                        <tr>
                          <th className="text-center">Resource</th>
                          <th className="text-center">Description</th>
                          <th className="text-center">Download</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows}
                        {tableRows}
                      </tbody>
                    </Table>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
              <Col sm={2} className="bg-main-red-darken text-center p-5">
                <Tab.Content>
                  <Tab.Pane eventKey="1">
                    <h3 className="display-5 pt-5">Convert</h3>
                    <p>Lorem Ipsum doler sunit</p>
                  </Tab.Pane>
                  <Tab.Pane eventKey="2">
                    <h3 className="display-5 pt-5">Create</h3>
                    <p>Lorem Ipsum doler sunit</p>
                  </Tab.Pane>
                  <Tab.Pane eventKey="3">
                    <h3 className="display-5 pt-5">Construct</h3>
                    <p>Lorem Ipsum doler sunit</p>
                  </Tab.Pane>
                  <Tab.Pane eventKey="4">
                    <h3 className="display-5 pt-5">Commit</h3>
                    <p>Lorem Ipsum doler sunit</p>
                  </Tab.Pane>
                  <Tab.Pane eventKey="5">
                    <h3 className="display-5 pt-5">Control</h3>
                    <p>Lorem Ipsum doler sunit</p>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>;
        </div>
      </div>
    );
  }
}

export default Resources;
