import React, { useState, useCallback, useEffect } from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import validator from "validator";
import Layout from "./layout";

const ContactPage = ({ data: { site } }) => {
  const checkInput = useCallback(input => {
    // validator.blacklist()//configure
    // validator.stripLow(input)//sanitize
    // validator.trim(input)//sanitize
    // validator.isEmail(input)
    // validator.isLength(input,400)
    // validator.isJSON(input)//fail
  });

  return (
    <Layout LeftPanelContent={() => <></>} RightPanelContent={() => <></>}>
      <Helmet>
        <title>Contact —{site.siteMetadata.title}</title>
        <meta name="description" content={site.siteMetadata.description} />
      </Helmet>
      <div className="two-grids -contact">
        <div
          className="post-thumbnail"
          style={{
            backgroundImage: `url('https://i.imgur.com/6q9idRJ.jpg')`,
            marginBottom: 0
          }}
        >
          <h1 className="post-title">Get in Touch</h1>
          <p>Let me help you kick start your next project &rarr;</p>
        </div>
        <div>
          <form
            className="form-container"
            method="POST"
            encType="multipart/form-data"
            name="enquire"
            action="mailto:aidenf09@yahoo.com"
          >
            <div>
              <label htmlFor="Name">Name</label>
              <input type="text" name="Name" id="Name" />
            </div>
            <div>
              <label htmlFor="Sender">Email</label>
              <input type="email" name="Sender" id="Sender" />
            </div>
            <div>
              <label htmlFor="Subject">Subject</label>
              <input type="text" name="Subject" id="Subject" />
            </div>
            <div>
              <label htmlFor="Message">Message</label>
              <textarea name="Message" id="Message" />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <input
                type="submit"
                className="button -primary"
                style={{ marginRight: 0 }}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default ContactPage;
export const pageQuery = graphql`
  query ContactPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
