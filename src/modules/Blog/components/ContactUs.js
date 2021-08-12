import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import Input from "../../../shared/components/FormFields/Input";
import TextArea from "../../../shared/components/FormFields/TextArea";
import { contactUsSchema } from "../../../shared/schemas/contact-us-schema";
import { validateInput, validateForm } from "../../../shared/utils/validation";
import { contactUs } from "../../../api/ContactUsApi";

import { BLOG_APP_CAPTCHA_KEY } from "../../../shared/constants/constants";

const DELAY = 1500;

class ContactUs extends Component {
  constructor(props, ...args) {
    super(props, ...args);
    this._reCaptchaRef = React.createRef();
  }

  state = {
    contactInfo: {
      email: "",
      subject: "",
      name: "",
      message: "",
    },
    errors: {},
    successAlert: false,
    errorAlert: false,
    callback: "not fired",
    recaptchaValue: null,
    load: false,
    expired: "false",
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ load: true });
    }, DELAY);
    console.log("didMount - reCaptcha Ref-", this._reCaptchaRef);
  }

  onChange = e => {
    const id = e.target.id;
    const value = e.target.value;

    const contactInfo = { ...this.state.contactInfo };
    const errors = { ...this.state.errors };

    contactInfo[id] = value;

    const error = validateInput({ [id]: value }, id, contactUsSchema);
    if (!error) {
      delete errors[id];
    } else {
      errors[id] = error.message;
    }

    this.setState(prevState => ({ contactInfo, errors }));
  };

  handleContactUs = contactUsInfo => {
    contactUs({ ...contactUsInfo })
      .then(res => {
        if (res.data) {
          this.setState({ errorAlert: false, successAlert: true });
        }
      })
      .catch(error => {
        this.setState({ errorAlert: true });
      });
  };

  sendMessage = () => {
    const contactInfo = { ...this.state.contactInfo };
    let errors = validateForm(contactInfo, contactUsSchema);

    if (errors) {
      this.setState(prevState => ({ errors }));
      return;
    }

    if (!this.state.recaptchaValue) {
      return;
    }

    console.log("blah");

    this.handleContactUs({ ...contactInfo });
  };

  dismiss = () => {
    this.setState({
      errorAlert: false,
      successAlert: false,
    });
  };

  // recaptcha

  onRecaptchaChange = value => {
    console.log("Captcha value:", value);
    this.setState({ recaptchaValue: value });
    // if value is null recaptcha expired
    if (value === null) this.setState({ expired: "true" });
  };

  asyncScriptOnLoad = () => {
    this.setState({ callback: "called!" });
    console.log("scriptLoad - reCaptcha Ref-", this._reCaptchaRef);
  };

  render() {
    return (
      <section className="contact-wrapper">
        <div className="container home">
          <div className="contact-us-form col-lg-6">
            <div className="form-row">
              <Input type="text" id="subject" classNames="col" label="الموضوع" value={this.state.contactInfo.subject} error={this.state.errors.subject} onChange={this.onChange} />
            </div>
            <div className="form-row">
              <Input type="text" id="name" classNames="col" label="الاسم" value={this.state.contactInfo.name} error={this.state.errors.name} onChange={this.onChange} />
            </div>
            <div className="form-row">
              <Input type="email" id="email" classNames="col" label="البريد الالكتروني" value={this.state.contactInfo.email} error={this.state.errors.email} onChange={this.onChange} />
            </div>
            <TextArea id="message" rows="5" placeholder="رسالتك تبدأ هنا ..." value={this.state.contactInfo.body} error={this.state.errors.message} onChange={this.onChange} />
            <div className="form-row">
              <ReCAPTCHA theme="dark" className="blog-recaptcha mr-1" ref={this._reCaptchaRef} sitekey={BLOG_APP_CAPTCHA_KEY} onChange={this.onRecaptchaChange} asyncScriptOnLoad={this.asyncScriptOnLoad} />
            </div>
            <div className="form-row">
              <button className="btn btn-success mt-2 mb-1 mr-1" onClick={this.sendMessage}>
                إرسال
              </button>
            </div>
            {this.state.successAlert && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                تم إرسال الرسالة بنجاح! سوف نقوم بالرد عليك في أقرب وقت.
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.dismiss}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}

            {this.state.errorAlert && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                لم يتم إرسال الرسالة! برجاء المحاولة مرة آخرى.
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.dismiss}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default ContactUs;
