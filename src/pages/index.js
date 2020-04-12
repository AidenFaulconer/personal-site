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
  const [sections,setSections] = useState([])//the initial state
  const [curSection,setCurSection] = useState('main')//the initial state
  //#region auto pick the current section
  let prevPos,curPos = 0;
    // let offset = 100;//in pixels
  // let sectionOffsets = [
  //   -1,
  //   sections[0].clientHeight / 2, // its a tiny bit off, this makes the offset more correct
  //   sections[0].clientHeight + sections[1].clientHeight - offset,
  //   sections[0].clientHeight + sections[1].clientHeight + sections[2].clientHeight - offset,
  //   sections[0].clientHeight + sections[1].clientHeight + sections[2].clientHeight + sections[3].clientHeight - offset,
  //   sections[0].clientHeight + sections[1].clientHeight + sections[2].clientHeight + sections[3].clientHeight + sections[4].clientHeight - offset
  // ]
  // let lineIndicator = document.getElementById('indicator');
  //#endregion auto pick the current section

  //componentDidMount
  useEffect(()=>{
    let documentGets = document.getElementsByTagName('section');
    setSections([
    ...sections,//prevState
    ...Object.keys(documentGets).map((elem) => [documentGets[elem]])//newState
    ])
    //#region window events
  //   window.onscroll = () => {
  //   currPos = document.body.scrollTop;
  //   // only check if user moves more than 20px from the last call to reduce function calls
  //   if (curPos - prevPos > 20) {

  //     //update left line indicator
  //     lineIndicator.style.height = ((sectionOffsets[i] / sectionOffsets[sectionOffsets.length - 1]) * 100) + '%'
  //     for (let i = 0; i < sectionOffsets.length; ++i) {
  //       if (currPos > sectionOffsets[i] || currPos2 > sectionOffsets[i]) {
  //         ellipses[i].checked = true
  //         // console.error('you are at: '+sections[i].id)
  //         // console.error(sections[i])
  //         // style line on left based on our current section divided by the total sections
  //       } else {
  //         sections[i].style.opacity = '0'// all elements fade into view, otherwise they fade out
  //       }
  //     }
  //   }
  //   prevPos = curPos;//set previous position to be the current (since we are done computing)
  // }
    //#endregion window events
  },[])

  //functions modifying local data (cannot be referenced in jsx)
  let ellipses = [];
  const checkEllipses = () => {
    ellipses.length<0 ? '' : ellipses = document.getElementsByName("ellipses");//if no ellipses get the ellipses (they will correspond to sections length)
    for (let i = 0; i < sections.length; ++i) {
      if (ellipses[i].checked) sections[i][0].scrollIntoView(true)//sass logic handles the checked input box for us
    }
  }

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
)}
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

  const [curPosition,setCurPosition] = useState(0)//creates currPosition and the setstate function

  //componentDidMount
  useEffect(()=>{
    // window.onresize = function () { handleWindowResize() }//recalculare sections
    // setCurPosition([
    // '',//prev
    // ''//new
    // ])
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
        <EllipseBar
          userAt={curPosition}
        />
      </div>

    </>
  );
};
export default IndexPage;

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
