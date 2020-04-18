import React, {useEffect,useState} from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostLink from '../components/post-link';
import HeroHeader from '../components/heroHeader';
import { threeCanvas } from '../components/threejs/app';
import SectionBuilder from '../components/section-builder';
import SVG from 'svg-inline-react';

//TODO: add google analytics


//#region hardcoded SVGS (will be replaced by a proper inline svg loader when i find one)
const navSvgs = [
`<svg width="51" height="46" viewBox="0 0 51 46" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4018 38.271C20.9541 38.271 21.4018 37.8232 21.4018 37.271V27.7897C21.4018 27.2374 21.8495 26.7897 22.4018 26.7897H28.8327C29.385 26.7897 29.8327 27.2374 29.8327 27.7897V37.271C29.8327 37.8232 30.2804 38.271 30.8327 38.271H39.3713C39.9236 38.271 40.3713 37.8232 40.3713 37.271V23.9626C40.3713 23.4103 40.819 22.9626 41.3713 22.9626H43.8902C44.8303 22.9626 45.2509 21.783 44.5229 21.1882L26.25 6.2576C25.8818 5.95676 25.3527 5.95676 24.9845 6.2576L6.71162 21.1882C5.98362 21.783 6.40424 22.9626 7.34435 22.9626H9.86321C10.4155 22.9626 10.8632 23.4103 10.8632 23.9626V37.271C10.8632 37.8232 11.3109 38.271 11.8632 38.271H20.4018Z" />
</svg>
`,
`<svg width="51" height="47" viewBox="0 0 51 47" xmlns="http://www.w3.org/2000/svg">
<path d="M42.479 11.9637H26.006C25.756 11.9637 25.515 11.87 25.3306 11.7011L21.6885 8.36524C21.5041 8.19634 21.2631 8.10266 21.0131 8.10266H8.75548C6.41591 8.10266 4.54004 9.82083 4.54004 11.9637V35.1301C4.54004 36.1541 4.98416 37.1361 5.77471 37.8602C6.56526 38.5843 7.63748 38.9911 8.75548 38.9911H42.479C44.7975 38.9911 46.6945 37.2536 46.6945 35.1301V15.8248C46.6945 13.7012 44.7975 11.9637 42.479 11.9637ZM39.1488 26.4427L32.6253 32.5575C32.2403 32.9185 31.641 32.918 31.2565 32.5565L24.7531 26.4427C23.9732 25.7091 23.5095 24.7438 23.5095 23.6434C23.5095 21.4619 25.4065 19.6858 27.725 19.6858C28.8632 19.6858 29.9381 20.1299 30.7179 20.8635L31.2588 21.3674C31.6428 21.7252 32.2381 21.7252 32.6221 21.3675L33.184 20.8441C33.9428 20.1299 35.0177 19.6858 36.1559 19.6858C38.4744 19.6858 40.3713 21.4619 40.3713 23.6434C40.3713 24.7245 39.9076 25.7284 39.1488 26.4427Z" />
</svg>
`,
`<svg width="51" height="49" viewBox="0 0 51 49" xmlns="http://www.w3.org/2000/svg">
<path d="M44.5868 26.2035C45.8514 26.2035 46.9053 26.5998 47.5376 27.3926C48.3807 28.1853 48.8022 29.1761 48.8022 30.167L31.9404 36.1123L17.1864 32.1488V14.3129H21.191L36.5774 19.6636C37.6313 20.06 38.2636 20.8527 38.2636 21.8436C38.2636 22.4381 38.0528 23.0327 37.6313 23.429C37.2097 23.8254 36.5774 24.2217 35.7343 24.2217H29.8327L26.2496 22.8345L25.6173 24.6181L29.8327 26.2035H44.5868V26.2035ZM4.54004 14.3129H12.9709V36.1123H4.54004V14.3129Z" />
</svg>
`,
`<svg width="52" height="50" viewBox="0 0 52 50" xmlns="http://www.w3.org/2000/svg">
<path d="M10.9497 45.2031H40.6997C43.0436 45.2031 44.9497 43.3717 44.9497 41.1198V12.5364C44.9497 10.2845 43.0436 8.45308 40.6997 8.45308H36.4497V4.36975H32.1997V8.45308H19.4497V4.36975H15.1997V8.45308H10.9497C8.60583 8.45308 6.69971 10.2845 6.69971 12.5364V41.1198C6.69971 43.3717 8.60583 45.2031 10.9497 45.2031ZM23.6997 37.8817L15.8223 30.3132L18.8271 27.4263L23.6997 32.1078L32.8223 23.343L35.8271 26.2299L23.6997 37.8817ZM10.9497 14.5781H40.6997V18.6614H10.9497V14.5781Z" />
</svg>
`,
`<svg width="51" height="47" viewBox="0 0 51 47" xmlns="http://www.w3.org/2000/svg">
<path d="M27.7255 6.17334C19.7794 6.17334 13.3719 11.8964 12.9714 19.0939L8.92459 24.0021C8.41873 24.6035 8.92459 25.5735 9.80983 25.5735H12.9714V31.3936C12.9714 33.547 14.8473 35.2736 17.1869 35.2736H19.2946V41.0937H34.0486V31.995C39.0439 29.8222 42.4795 25.1855 42.4795 19.7535C42.4795 12.265 35.9034 6.17334 27.7255 6.17334ZM36.1564 17.4836C36.1564 20.4713 33.2899 22.8575 28.948 26.4853L27.7255 27.5135L26.503 26.4853C22.1611 22.8575 19.2946 20.4713 19.2946 17.4836C19.2946 15.1556 21.318 13.235 23.8473 13.2156H23.9316C25.3859 13.2156 26.777 13.817 27.7255 14.8258C28.6739 13.817 30.065 13.2156 31.5194 13.2156C34.0486 13.1962 36.1564 15.078 36.1564 17.406V17.4836V17.4836Z" />
</svg>`
,
`<svg width="51" height="48" viewBox="0 0 51 48" xmlns="http://www.w3.org/2000/svg">
<path d="M40.3715 6.15139H38.2638V2.2312H34.0483V6.15139H17.1866V2.2312H12.9711V6.15139H10.8634C9.74539 6.15139 8.67317 6.56441 7.88262 7.29959C7.09207 8.03477 6.64795 9.03188 6.64795 10.0716V37.5129C6.64795 38.5526 7.09207 39.5497 7.88262 40.2849C8.67317 41.0201 9.74539 41.4331 10.8634 41.4331H40.3715C42.69 41.4331 44.5869 39.669 44.5869 37.5129V10.0716C44.5869 7.91548 42.69 6.15139 40.3715 6.15139ZM25.6174 12.0317C29.1163 12.0317 31.9406 14.6582 31.9406 17.912C31.9406 21.1657 29.1163 23.7922 25.6174 23.7922C22.1186 23.7922 19.2943 21.1657 19.2943 17.912C19.2943 14.6582 22.1186 12.0317 25.6174 12.0317ZM38.2638 35.5528H12.9711V33.5927C12.9711 29.6725 21.402 27.5164 25.6174 27.5164C29.8329 27.5164 38.2638 29.6725 38.2638 33.5927V35.5528Z" />
</svg>`
,
]

const socialSvgs = [
`<svg width="29" height="25" viewBox="0 0 29 25"  xmlns="http://www.w3.org/2000/svg">
<path d="M5.86218 0C2.84681 0 0.378906 2.15758 0.378906 4.7939V19.6702C0.378906 22.3065 2.84675 24.4633 5.86218 24.4633H22.8777C25.8931 24.4633 28.3601 22.3065 28.3601 19.6702V4.7939C28.3601 2.15763 25.8931 0 22.8777 0H5.86218ZM7.2413 4.03694C8.68711 4.03694 9.57766 4.86676 9.60515 5.95754C9.60515 7.02424 8.68705 7.87738 7.21334 7.87738H7.18621C5.76792 7.87738 4.85122 7.02429 4.85122 5.95754C4.85122 4.86678 5.79567 4.03694 7.24128 4.03694H7.2413ZM19.7006 9.13513C22.4812 9.13513 24.5656 10.724 24.5656 14.1385V20.5127H20.3399V14.5659C20.3399 13.0715 19.7283 12.0519 18.1991 12.0519C17.0316 12.0519 16.3358 12.7391 16.0303 13.403C15.9187 13.6405 15.8912 13.9722 15.8912 14.3044V20.5127H11.6655C11.6655 20.5127 11.721 10.4389 11.6655 9.39583H15.8921V10.9701C16.4536 10.2126 17.4581 9.1351 19.7006 9.1351V9.13513ZM5.10048 9.39663H9.32617V20.5128H5.10048V9.39663V9.39663Z" />
</svg>
`,
`<svg width="28" height="25" viewBox="0 0 28 25"  xmlns="http://www.w3.org/2000/svg">
<path d="M24.4675 0.0530396H3.25321C1.65611 0.0530396 0.360352 1.22285 0.360352 2.66471V21.817C0.360352 23.2588 1.65611 24.4286 3.25321 24.4286H24.4675C26.0646 24.4286 27.3604 23.2588 27.3604 21.817V2.66471C27.3604 1.22285 26.0646 0.0530396 24.4675 0.0530396ZM17.0726 20.9301C16.5664 21.0117 16.3795 20.7288 16.3795 20.4948C16.3795 20.201 16.3916 18.6993 16.3916 17.4859C16.3916 16.6371 16.0782 16.0985 15.7106 15.8156C17.9405 15.5925 20.2909 15.315 20.2909 11.8382C20.2909 10.8479 19.8992 10.3528 19.2604 9.71622C19.3628 9.48226 19.7063 8.5192 19.1579 7.26778C18.3202 7.03382 16.4037 8.24171 16.4037 8.24171C15.6081 8.0404 14.7463 7.93702 13.8965 7.93702C13.0467 7.93702 12.1849 8.0404 11.3894 8.24171C11.3894 8.24171 9.47285 7.03382 8.63513 7.26778C8.08669 8.51376 8.42419 9.47681 8.53267 9.71622C7.89383 10.3528 7.59249 10.8479 7.59249 11.8382C7.59249 15.2987 9.84049 15.5925 12.0704 15.8156C11.7811 16.0495 11.522 16.4521 11.4316 17.0289C10.859 17.2629 9.3945 17.6655 8.52062 16.2726C7.97218 15.4129 6.98379 15.3422 6.98379 15.3422C6.00745 15.3313 6.91749 15.8972 6.91749 15.8972C7.56839 16.1692 8.02642 17.2139 8.02642 17.2139C8.61102 18.8299 11.4075 18.2858 11.4075 18.2858C11.4075 19.0421 11.4195 20.2717 11.4195 20.4948C11.4195 20.7288 11.2387 21.0117 10.7264 20.9301C6.74874 19.7276 3.96437 16.3107 3.96437 12.317C3.96437 7.32219 8.19517 3.52982 13.7278 3.52982C19.2604 3.52982 23.7443 7.32219 23.7443 12.317C23.7503 16.3107 21.0503 19.7331 17.0726 20.9301ZM11.1604 17.6056C11.0458 17.6274 10.9374 17.5839 10.9253 17.5131C10.9133 17.4315 10.9916 17.3608 11.1061 17.339C11.2206 17.3281 11.3291 17.3717 11.3412 17.4424C11.3592 17.5131 11.2809 17.5839 11.1604 17.6056ZM10.5878 17.5567C10.5878 17.6274 10.4974 17.6873 10.3769 17.6873C10.2443 17.6981 10.1539 17.6383 10.1539 17.5567C10.1539 17.4859 10.2443 17.4261 10.3648 17.4261C10.4793 17.4152 10.5878 17.4751 10.5878 17.5567ZM9.76214 17.4968C9.73803 17.5675 9.61749 17.6002 9.51504 17.5675C9.40053 17.5458 9.32218 17.4642 9.34629 17.3934C9.3704 17.3227 9.49093 17.2901 9.59339 17.3118C9.71392 17.3445 9.79227 17.4261 9.76214 17.4968ZM9.02084 17.203C8.9666 17.2629 8.85209 17.252 8.76169 17.1704C8.67129 17.0996 8.64718 16.9962 8.70745 16.9473C8.76169 16.8874 8.8762 16.8983 8.9666 16.9799C9.04495 17.0507 9.07508 17.1595 9.02084 17.203ZM8.47241 16.7079C8.41816 16.7405 8.31571 16.7079 8.24941 16.6263C8.18312 16.5446 8.18312 16.4521 8.24941 16.4141C8.31571 16.3651 8.41816 16.4032 8.47241 16.4848C8.5387 16.5664 8.5387 16.6643 8.47241 16.7079V16.7079ZM8.08066 16.1801C8.02642 16.2291 7.93602 16.2019 7.86973 16.1475C7.80343 16.0767 7.79138 15.9951 7.84562 15.957C7.89986 15.908 7.99026 15.9353 8.05656 15.9897C8.12285 16.0604 8.13491 16.142 8.08066 16.1801ZM7.67687 15.7775C7.65276 15.8264 7.57441 15.8373 7.50812 15.7992C7.42977 15.7666 7.39361 15.7067 7.41772 15.6578C7.44182 15.6251 7.50812 15.6088 7.58647 15.636C7.66482 15.6741 7.70098 15.7339 7.67687 15.7775Z" />
</svg>
`,
`<svg width="26" height="26" viewBox="0 0 26 26"  xmlns="http://www.w3.org/2000/svg">
<path d="M13.0002 8.83435C10.7064 8.83435 8.83453 10.7062 8.83453 13C8.83453 15.2937 10.7064 17.1656 13.0002 17.1656C15.2939 17.1656 17.1658 15.2937 17.1658 13C17.1658 10.7062 15.2939 8.83435 13.0002 8.83435ZM25.4939 13C25.4939 11.275 25.5095 9.5656 25.4127 7.84373C25.3158 5.84373 24.8595 4.06873 23.397 2.60623C21.9314 1.1406 20.1595 0.687477 18.1595 0.590602C16.4345 0.493727 14.7252 0.509352 13.0033 0.509352C11.2783 0.509352 9.5689 0.493727 7.84703 0.590602C5.84702 0.687477 4.07202 1.14373 2.60952 2.60623C1.1439 4.07185 0.690773 5.84373 0.593898 7.84373C0.497023 9.56873 0.512648 11.2781 0.512648 13C0.512648 14.7219 0.497023 16.4344 0.593898 18.1562C0.690773 20.1562 1.14702 21.9312 2.60952 23.3937C4.07515 24.8594 5.84702 25.3125 7.84703 25.4094C9.57203 25.5062 11.2814 25.4906 13.0033 25.4906C14.7283 25.4906 16.4377 25.5062 18.1595 25.4094C20.1595 25.3125 21.9345 24.8562 23.397 23.3937C24.8627 21.9281 25.3158 20.1562 25.4127 18.1562C25.5127 16.4344 25.4939 14.725 25.4939 13V13ZM13.0002 19.4094C9.45327 19.4094 6.59077 16.5469 6.59077 13C6.59077 9.4531 9.45327 6.5906 13.0002 6.5906C16.547 6.5906 19.4095 9.4531 19.4095 13C19.4095 16.5469 16.547 19.4094 13.0002 19.4094ZM19.672 7.82498C18.8439 7.82498 18.1752 7.15623 18.1752 6.3281C18.1752 5.49998 18.8439 4.83123 19.672 4.83123C20.5002 4.83123 21.1689 5.49998 21.1689 6.3281C21.1692 6.52474 21.1306 6.7195 21.0555 6.90122C20.9803 7.08294 20.8701 7.24806 20.731 7.3871C20.592 7.52615 20.4269 7.6364 20.2452 7.71154C20.0634 7.78668 19.8687 7.82522 19.672 7.82498V7.82498Z" />
</svg>
`,
]

const logoSvg = [
`<svg width="60" height="52" viewBox="0 0 60 52"  xmlns="http://www.w3.org/2000/svg">
<path d="M50.2896 35.8431L43.2766 50.7547L34.7098 50.7944L43.1343 33.909" />
<path d="M37.8534 26.7798L25.6809 50.836L17.2677 50.875L34.159 17.8729" />
<path d="M31.6542 3.96509L9.32031 51.4757L0.964272 51.45L24.7164 0.311716L31.6542 3.96509Z" />
<path d="M30.9019 0.308364L39.313 15.1308C41.9265 19.1783 39.8338 23.1939 37.8349 26.7799L24.7168 0.336975L30.9019 0.308364Z" />
<path d="M43.0727 21.8555C41.0928 25.3878 38.8665 29.5829 40.8627 33.1146L51.0552 50.7365L59.4876 50.6975" />
</svg>
`
]
//#endregion hardcoded SVGS (will be replaced by a proper inline svg loader when i find one)

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

//#region the primary Navigation bar
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
    sectionsCPY = Object.keys(documentGets).map((elem) => [documentGets[elem]]);//set initial section state for local functions
    setSections([
    ...sections,//prevState
    ...sectionsCPY
    ]/*newState*/)//set initial section state for jsx

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
        let lineIndicatorHeight = ((thisPosition/(sectionBreakpoints[sectionBreakpoints.length-1]) * 100));
        (lineIndicatorHeight > 100) ? '' : lineIndicator.style.height = lineIndicatorHeight + '%';
        // console.warn(lineIndicatorHeight);
    if (thisPosition - prevPosition > 0 || Math.abs(prevPosition - thisPosition) > 10) {//we only handle every 30pixels we scroll down OR up to reduce overhead
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

  //react jsx
  return (
    <nav className='ellipses-bar' id='ellipses-bar'>
      <h3 className="ellipses__text">explore here</h3>
      {
        sections.map((sectionName,i)=>
        (<input onClick={checkEllipses} onChange={checkEllipses} type='radio' name="ellipses" id={`ellipses-page__${i}`} checked={i===0 && 'checked'}/>))//sass logic handles which one is checked
      }
      <div id='slider'>
      {
        sections.map((sectionName,i)=>
        (<label key={i} htmlFor={`ellipses-page__${i}`}>
          <span key={i} className='slider-label'>{sectionName[0].id}</span>
          <span key={i} className='slider-number'>{i}</span>
          <div  key={i} dangerouslySetInnerHTML={{__html: navSvgs[i]}} description="navigation icon, click me to navigate to a new section"/>
        </label>))
      }
        </div>
    </nav>
  )
}
//#endregion Ellipse Navigation bar

//#region Social media links (on the right)
const MediaLinks = () => (
  <div id="social-media-bar">
    <a href="https://www.instagram.com/aidenfaulconer/">
          <div dangerouslySetInnerHTML={{__html: socialSvgs[0]}} description="navigation icon, click me to navigate to a new section"/>
    </a>
    <a href="https://www.linkedin.com/in/aiden-faulconer/">
          <div dangerouslySetInnerHTML={{__html: socialSvgs[1]}} description="navigation icon, click me to navigate to a new section"/>
    </a>
    <a href="https://github.com/AidenFaulconer">
          <div dangerouslySetInnerHTML={{__html: socialSvgs[2]}} description="navigation icon, click me to navigate to a new section"/>
    </a>
  </div>
)
//#endregion Social media links (on the right)




//#region mobile menu
const MobileMenu = () => {

const [menu, toggleMenu] = useState(false)
return(
<>
<button onClick={()=>toggleMenu(!menu)} className={`hamburger hamburger--stand-r ${menu&&'is-active'}`} type="button" aria-label="Menu" aria-controls="navigation">
  <span className="hamburger-box">
    <span className="hamburger-inner"/>
  </span>
</button>
{/**styled to overlay the entire view with content */}
{menu && (
<div className='mobile__menu__overlay' id='mobile__menu__overlay'>
<span><a onClick={()=>toggleMenu(!menu)} href='#main'>Main</a></span>
<span><a onClick={()=>toggleMenu(!menu)} href='#projects'>Projects</a></span>
<span><a onClick={()=>toggleMenu(!menu)} href='#skills'>Skills</a></span>
<span><a onClick={()=>toggleMenu(!menu)} href='#about'>About</a></span>
<span><a onClick={()=>toggleMenu(!menu)} href='#services'>Servies</a></span>
<span><a onClick={()=>toggleMenu(!menu)} href='#contact'>Contact</a></span>
</div>
)}
</>
)
}
//#endregion mobile menu

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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"></script>
<script src="conic-gradient.js"></script>
      {/** spawns in threejs canvas*/}
      <ThreeComponent/>
      {/** loadwrapper handled by threejs custom component */}
      {/**<LoadWrapper />*/}

      {/**main page right interactive panel*/}
      <div className="panel right">
      <MediaLinks/>
      </div>


      {/**burger icon in <MobileMenu/> its availiblity is controlled by scss breakpoints*/}
      <MobileMenu/>
      <EllipseBar/>
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
          <div dangerouslySetInnerHTML={{__html: logoSvg[0]}} description="navigation icon, click me to navigate to a new section"/>
        <div id='line-indicator' className='line-indicator'/>
      </div>

    </>
  );
};
//gatsy develop -H 192.168.0.1 -p 8000

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
