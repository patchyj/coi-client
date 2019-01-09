import React, { Component } from 'react';
import axios from 'axios';
import { updateChapter } from '../../actions/chapterActions';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class EditChapterModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bannerPic: '',
      twitterUrl: '',
      facebookUrl: '',
      linkedinUrl: '',
      errors: {},
      ready: true
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addPhoto = this.addPhoto.bind(this);
  }

  addPhoto(e, imageType) {
    var formData = new FormData();

    formData.append('file', e.target.files[0]);
    formData.append('name', 'test');
    this.setState({ ready: false });

    axios
      .post('/api/posts/files', formData)
      .then(res => {
        this.setState({ [imageType]: res.data.url, ready: true });
      })
      .catch(errors => this.setState({ errors }));
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const id = this.props.chapter._id;

    const updatedChapter = {
      bannerPic: this.state.bannerPic,
      twitterUrl: this.state.twitterUrl,
      facebookUrl: this.state.facebookUrl,
      linkedinUrl: this.state.linkedinUrl
    };

    this.props.updateChapter(id, updatedChapter);
    window.location.reload();
    // console.log(updatedChapter, id);
  }

  componentDidMount() {
    const {
      bannerPic,
      twitterUrl,
      facebookUrl,
      linkedinUrl
    } = this.props.chapter;
    this.setState({
      bannerPic,
      twitterUrl,
      facebookUrl,
      linkedinUrl
    });
  }

  render() {
    const modalButton = {
      position: 'absolute',
      right: '30px',
      top: '60px',
      borderRadius: '50%',
      background: '#f20031'
    };

    const {
      twitterUrl,
      facebookUrl,
      linkedinUrl,
      bannerPic,
      errors
    } = this.state;

    const { chapter } = this.props;

    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#editChapter"
          style={modalButton}
        >
          <i className="fas fa-pencil-alt" />
        </button>

        <div
          className="modal fade"
          id="editChapter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="editChapterLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editChapterLabel">
                  Edit {chapter.city}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-inline my-1">
                  <label className="col-md-4" htmlFor="twitterUrl">
                    Twitter URL:
                  </label>

                  <input
                    placeholder="Full Twitter URL here"
                    className="form-control col-md-8"
                    type="text"
                    name="twitterUrl"
                    value={twitterUrl}
                    onChange={this.onChange}
                    error={errors.twitterUrl}
                  />
                </div>
                <div className="form-inline my-1">
                  <label className="col-md-4" htmlFor="facebookUrl">
                    Facebook URL:
                  </label>

                  <input
                    placeholder="Full Facebook URL here"
                    className="form-control col-md-8"
                    type="text"
                    name="facebookUrl"
                    value={facebookUrl}
                    onChange={this.onChange}
                    error={errors.facebookUrl}
                  />
                </div>
                <div className="form-inline my-1">
                  <label className="col-md-4" htmlFor="linkedinUrl">
                    Linkedin URL:
                  </label>

                  <input
                    placeholder="Full LinkedIn URL here"
                    className="form-control col-md-8"
                    type="text"
                    name="linkedinUrl"
                    value={linkedinUrl}
                    onChange={this.onChange}
                    error={errors.linkedinUrl}
                  />
                </div>
                <div className="form-inline py-3">
                  <label htmlFor="" className="col-md-4">
                    Banner Image
                  </label>
                  <input
                    type="file"
                    className="form-control-file col-md-8"
                    name="bannerPic"
                    onChange={e => this.addPhoto(e, 'bannerPic')}
                  />
                  <small className="col-md-12 text-center">
                    Current image: {bannerPic}
                  </small>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn" data-dismiss="modal">
                  Close
                </button>
                {this.state.ready ? (
                  <input
                    type="submit"
                    value="Save changes"
                    onClick={this.onSubmit}
                  />
                ) : (
                  <input type="submit" value="Uploading..." disabled />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditChapterModal.propTypes = {
  updateChapter: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { updateChapter }
)(EditChapterModal);
