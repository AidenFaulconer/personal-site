import React, {useEffect,useState} from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostLink from '../components/post-link';
import HeroHeader from '../components/heroHeader';
import { threeCanvas } from '../components/threejs/app';
import SectionBuilder from '../components/section-builder';

//#region loading wrapper to handle screen loading
const LoadWrapper = ({}) => (
  <div className="loader" id="loader">
    <div className="lds-ring" id="lds-ring">
      <img alt='logo' loading="lazy" id="lds-ring__logo" src="./img/logo.svg" viewBox="0 0 10 10" id="logo" />
      <label id="lds-ring__text">loading</label>
      {/* ring segments */}
      <div/><div/><div/><div/>
      {/* ring segments */}
    </div>
    <div id="loader-bar" data="test" />
  </div>
);
//#endregion loading wrapper to handle screen loading

//#region threeJs react wrapper
const ThreeComponent = () => {
  //componentDidMount
  useEffect(()=>threeCanvas(),[])

  return (<div id='canvas'></div>);
}
//#endregion threeJs react wrapper

//#region Ellipse Navigation bar
const EllipseBar = ({userAt}) => {
  //state & accompanying setter
  const [sections,setSections] = useState([])//the initial state used in jsx

  //#region local function state (not reliable for use in jsx!!!)
  let sectionsCPY = []//the local function state NOT used in jsx
  let ellipses = [];
  let lineIndicator = null;
  let offset = 0;
  let prevPosition = 0;
  let sectionBreakpoints = [];
  //#endregion local function state (not reliable for use in jsx!!!)

  //componentDidMount
  useEffect(()=>{
    //#region get all the sections which will be used to determine the page height
    let documentGets = document.getElementsByTagName('section');
    //set initial section state for local functions
    sectionsCPY = Object.keys(documentGets).map((elem) => [documentGets[elem]]);
    //set initial section state for jsx
    setSections([
    ...sections,//prevState
    ...sectionsCPY
    ]/*newState*/)
    //#endregion get all the sections which will be used to determine the page height

    //get the lineIndicator element spawned in the layout component (will update our relative position in here)
    lineIndicator = document.getElementById('line-indicator');

    //#region attatch window events
    window.onresize = ()=> measureSections()//recalculare section heights
    window.onscroll = () => handleCurrentPosition()//handle logic for when we scroll
    //#endregion window events

    //#region call initial window events
    measureSections();//section state not accessible in this componentDidMount function call, use the local copy instead
    handleCurrentPosition();
    //#end region call initial window events
  },[])

  //#region functions modifying local data (cannot be referenced in jsx)
  const checkEllipses = () => {
    ellipses.length<0 ? '' : ellipses = document.getElementsByName("ellipses");//if no ellipses get the ellipses (they will correspond to sections length)
    for (let i = 0; i < sections.length; ++i) {
      if (ellipses[i].checked) sections[i][0].scrollIntoView(true)//sass logic handles the checked input box for us
    }
  }
  //calculate section lengths on a 1:1 correspondence with the sections
  const measureSections = (s) => {//if no value passed in, default to the react state held section list
  let newMeasurements = [0];//first breakpoint is 0!

  sectionsCPY.map((element)=>element[0].clientHeight)//get all the heights (in backward order)
  .reduce((accumulatedHeight,nextSectionHeight,i)=>{//then reduce these to create a mapping of each sections height from the top of the page

  //push new measurement (first section breakpoint should be 0!)
  newMeasurements.push((accumulatedHeight)-offset)

  return (accumulatedHeight+nextSectionHeight)//keep accumulating
  })

  // console.warn(`${[...newMeasurements]} is the new array of measurements`)
  //set new measurements

  sectionBreakpoints = newMeasurements//set the new measurements on this components state so it forces an update of the UI
  }

  const handleCurrentPosition = () => {
    let thisPosition = window.scrollY
        let lineIndicatorHeight = ((thisPosition/(sectionBreakpoints[sectionBreakpoints.length-1]+900) * 100));
        (lineIndicatorHeight > 100) ? '' : lineIndicator.style.height = lineIndicatorHeight + '%';
        // console.warn(lineIndicatorHeight);
    if (thisPosition - prevPosition > 10 || Math.abs(prevPosition - thisPosition) > 10) {//we only handle every 30pixels we scroll down OR up to reduce overhead
      for (let i = 0;i<=sectionBreakpoints.length;++i){//increment ahead since we start from 0 on sectionBreakpoints
        //#region handle a hit breakpoint
        if(thisPosition>=sectionBreakpoints[i] || thisPosition-sectionBreakpoints[i] > 0){//we hit a breakpoint
        //get percentage of page scrolled through and set the height to reflect that
        checkEllipses();ellipses[i].checked = true;//update then check the current one
        }
        //#endregion handle a hit breakpoint
      }
    }
    prevPosition = thisPosition;//now this position is the previous one
  }
  //#endregion functions modifying local data (cannot be referenced in jsx)


return (
<div className='ellipses-bar' id='ellipses-bar'>
    <p className="ellipses__text">explore here</p>
    {
      sections.map((sectionName,i)=>
      (<input onClick={checkEllipses} type='radio' name="ellipses" id={`ellipses-page__${i}`} checked={i===0 && 'checked'}/>))//sass logic handles which one is checked
    }
    <div id='slider'>
    {
      sections.map((sectionName,i)=>
      (<label htmlFor={`ellipses-page__${i}`}>
        <svg width='16' height='16' viewBox="0 0 16 16" fill='none' xmlns='http://www.w3.org/2000/svg'>
          <circle r='8' transform="matrix(-1 0 0 1 8 8)"fill='transparant' />
        </svg>
        <p className='slider-label'>{sectionName[0].id}</p>
        <p className='slider-number'>{i}</p>
      </label>))
    }
      </div>
  </div>
)
}
//#endregion Ellipse Navigation bar

//#region Social media links (on the right)
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
//#endregion Social media links (on the right)

const IndexPage = ({
//data is a global populated from our query
  data: {
    site,
    allMarkdownRemark: { edges },
  },
}) => {
  //get posts
  const Posts = edges
    .filter((edge) => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map((edge) => <PostLink key={edge.node.id} post={edge.node} />);
  //componentDidMount
  useEffect(()=>{
  },[])

  return (
    <>
      {/** spawns in threejs canvas*/}
      <ThreeComponent/>
      {/** loadwrapper handled by threejs custom component */}
      {/**<LoadWrapper />*/}

      {/**main page right interactive panel*/}
      <div className="panel right">
        <MediaLinks/>
        <h2 style={{marginTop: '120%'}}>Blog Posts &darr;</h2>
        <div className="grids">
          {Posts}
        </div>
      </div>

      <Layout Posts={Posts}>
        <Helmet>
          <title>{site.siteMetadata.title}</title>
          <meta name="description" content={site.siteMetadata.description} />
          {!site.siteMetadata.w3l_dom_key ? null : <meta name="w3l-domain-verification" content={site.siteMetadata.w3l_dom_key} />}
        </Helmet>
        <HeroHeader />
        <SectionBuilder/>
        {/**page content */}
      </Layout>

      {/**main page left interactive panel*/}
      <div className="panel left">
        <img src="./svg/logo.svg" style={{margin:'10% 32%',position:'absolute', width:'30%'}} loading='lazy'viewBox="0 0 10 10"/>
        <EllipseBar/>
        <div id='line-indicator' className='line-indicator'/>
      </div>

    </>
  );
};

export default IndexPage

export const pageQuery = graphql`
  query indexPageQuery {
    # here is the query we can call upon in our code by its name
    site {
      siteMetadata {
        title
        description
        w3l_dom_key
      }
    }
    # here is the query we can call upon in our code by its name
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            thumbnail
          }
        }
      }
    }
  }
`;
