import React from "react"
import useState from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Navigation from "../components/navigation"
import 'prismjs/themes/prism-okaidia.css';


const MediaLinks = () => (
<div id="social-media-bar">
        <a href="https://www.instagram.com/aidenfaulconer/">
          <img loading='lazy' src='./svg/instagram.svg' viewBox="0 0 10 10"/>
        </a>
        <a href="https://www.linkedin.com/in/aiden-faulconer/">
          <img loading='lazy' src='./svg/linkedin.svg' viewBox="0 0 10 10"/>
        </a>
        <a href="https://github.com/AidenFaulconer">
          <img loading='lazy' src='./svg/github.svg' viewBox="0 0 10 10"/>
        </a>
      </div>
)

//#region TODO: consolidate this code into react component as state and hooks

  // let documentGets = {
  //   navBar: document.getElementById('nav-bar'),
  //   logo: document.getElementById('logo'),
  //   rightBranding: document.getElementById('right-branding'),
  //   rightBrandingLabel: document.getElementById('right-branding').children.item(0),
  //   hover: document.getElementsByClassName('card-overlay'),
  //   media: document.getElementsByClassName('media'),
  //   mobileMenu: document.getElementById('mobile-menu'),
  //   mobileIcon: document.getElementById('nav-icon3'),
  //   mobilePages: document.getElementsByClassName('nav-bar__pages'),
  //   mainPageName: document.getElementById('name')
  // }


  // // #region values to calculate space each section takes for special naviagation
  // let offset = contentConfig.technical.scrollCheck.scrollOffset
  // let sectionOffsets = [
  //   -1,
  //   sections[0].clientHeight / 2, // its a tiny bit off, this makes the offset more correct
  //   sections[0].clientHeight + sections[1].clientHeight - offset,
  //   sections[0].clientHeight + sections[1].clientHeight + sections[2].clientHeight - offset,
  //   sections[0].clientHeight + sections[1].clientHeight + sections[2].clientHeight + sections[3].clientHeight - offset,
  //   sections[0].clientHeight + sections[1].clientHeight + sections[2].clientHeight + sections[3].clientHeight + sections[4].clientHeight - offset
  // ]
  // // #endregion
//#endregion TODO: consolidate this code into react component as state and hooks

//#region TODO: consolidate this ellispe code
  // for (let i = 0; i < ellipses.length; ++i) {
  //   ellipses[i].addEventListener('click', checkEllipses, false)
  // }
//#endregion TODO: consolidate this ellispe code

const EllipseBar = () => {
//update currentSEction via checkEllipses
// let [currentSection,checkEllipses] = useState(0)
const checkEllipses = () => {
  for (let i = 0; i < ellipses.length; ++i) {
    if (ellipses[i].checked) sections[i].scrollIntoView(true)
  }
}
//data
// const ellipses = document.getElementsByName('ellipses')
let sections = ['main','work','services','about','contact']
//html contents
return (
<div className='ellipses-bar' id='ellipses-bar'>
    <p className="ellipses__text">explore here</p>
    {
      sections.map((_,i)=>
      (<input type='radio' name='ellipses' id={`ellipses-page__${++i}`} checked={i===1 && 'checked'}/>))
    }
    <div id='slider'>
    {
      sections.map((sectionName,i)=>
      (<label for={`ellipses-page__${++i}`}>
        <svg width='16' height='16' viewBox="0 0 16 16" fill='none' xmlns='http://www.w3.org/2000/svg'>
          <circle r='8' transform="matrix(-1 0 0 1 8 8)"fill='transparant' />
        </svg>
        <p className='slider-label'>{sectionName}</p>
        <p className='slider-number'>{i}</p>
      </label>))
    }
      </div>
  </div>
)}


export default ({Posts, children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
  <>
  {/**main page left interactive panel*/}
    <div className="panel left">
      <img src="./svg/logo.svg" style={{margin:'10% 32%',position:'absolute', width:'30%'}} loading='lazy'viewBox="0 0 10 10"/>
      <EllipseBar/>
    </div>

  {/**site content primarily centered here*/}
    <div className="site-wrapper">
      <header className="site-header">
        <div className="site-title">
          <Link to="/">{data.site.siteMetadata.title}</Link>
        </div>
        <Navigation />
      </header>
      {children}
      <footer className="site-footer">
        <p>&copy; 2020 Aiden Faulconer &bull; Crafted with <span role="img" aria-label="love">❤️</span> by <a href="./">Aiden Faulconer</a></p>
      </footer>
    </div>

 {/**main page right interactive panel*/}
    <div className="panel right">
      <MediaLinks/>
            <h2 style={{marginTop: '120%'}}>Blog Posts &darr;</h2>
      <div className="grids">
        {Posts}
      </div>
    </div>
  </>
  )
}