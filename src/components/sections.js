
import React from "react"
import {Link } from "gatsby"
import contentConfig from '../../static/admin/contentConfig'

const section = ({props,children}) => (
    <section id={props.secId}>
    <div class='section__header' data-aos="fade-up" style='width: 100%;'>
      <div id='section-header__1'>
        {props.secHeader}
      </div>
      <div class='section__number'>
        {props.secNumber}
      </div>
    </div>
    <div class="section__flexbox">
    {/**render this wrappers children (which will be the specialized content) */}
    {children.map((component)=>component)}
    </div>
</section>
);

//generate content from contentConfig, this is specialized content for the landing page
contentComponents = [
<Main
secId='main'
secHeader='Main'
secNumber='1'
/>,
<Projects
secId='main'
secHeader='Main'
secNumber='1'
/>,
<SKills
secId='main'
secHeader='Main'
secNumber='1'
/>,
<Services
secId='main'
secHeader='Main'
secNumber='1'
/>,
<About
secId='main'
secHeader='Main'
secNumber='1'
/>,
<Contact
secId='main'
secHeader='Main'
secNumber='1'
/>,
]

const Projects = (props) => ();
const Skills = (props) => ();
const Services = (props) => ();
const About = (props) => ();
const Contact = (props) => ();

export {projects};