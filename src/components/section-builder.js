
import React from "react"
import * as ReactDom from "react-dom"
import {StaticQuery,Link, graphql } from "gatsby"

//TODO: add a contentID that refs a blog article, or find a better workaround here
//TODO: dont dangerously set inner html to avoid injeciton vunerabilities, write a script to pre-process it in nodejs rather than in react
const SectionBuilder = () =>
{
return(
<StaticQuery
     query={graphql`
      query ProjectsQuery {
          site {
            siteMetadata {
              mainPageContent {
                projects {
                  model
                  title
                  mediaUrl
                  catagory
                  description
                }
                skills {
                  title
                  description
                  summaryPoints
                }
                about {
                  title
                  description
                  mediaUrl
                }
                services {
                  title
                  description
                }
                contact {
                  title
                  value
                }
              }
            }
          }
        }
    `}
    render={data => (
    Object.keys(sections).map((sectionName,i)=>{
        const SectionComponent = sections[sectionName]
        return(
        <>
          <section id={sectionName} key={sectionName+i}>
            <div className='section__header'>
              <h1 data-aos="fade-up">{sectionName.toUpperCase()}</h1>
              <h1 data-aos="fade-up">{++i}</h1>
            </div>

            <SectionComponent
            key={sectionName+i}
            data={data.site.siteMetadata.mainPageContent[sectionName]}
            />
            {i === Object.keys(sections).length && console.error('sections loaded')}
          </section>
          </>
        )
      }
    ))
    }
  />
)};

const Projects = ({data}) => (
<div className="section__grid">
{/**build cards from data */}
{data.map((card)=>{
const {title,description,model,catagory,mediaUrl,postPath} = card;
return(
<article className="section__grid__card">
  <div className="card__lid">
    <h2 className="title" attribute="title">{title}</h2>
    <h3 className="description" attribute="description">{description}</h3>
    <h3 className="catagory">{catagory}</h3>
     <Link to={postPath}>
        <div className="cta">
          <p>see more</p>
          <img src="./svg/arrow.svg"/>
        </div>
     </Link>
  </div>
  <div className="preview">
  {model && (<></>) || (
  <video className="video-fluid" autoPlay loop muted playsInline>
    <source loading='lazy' src={mediaUrl} type="video/mp4" />
  </video>
  )}
  </div>
</article>
)
})}
</div>
)


const Skills = ({data}) => (
<div className="section__grid">
{/**build cards from data */}
{data.map((card)=>{
const {title,description,summaryPoints} = card;
return(
<article className="section__grid__card">
  <div className="card">
    <h2 className="title" attribute="title">{title}</h2>
    <h3 className="description" attribute="description" dangerouslySetInnerHTML={{ __html: description }}/>
    <ul>
    {summaryPoints.map((point)=>(
    <li className="summary__point">{point}</li>
    ))}
    </ul>
  </div>
</article>
)
})}
</div>
)


const About = ({data}) =>{
return(
<div className="section__grid">
{/**build cards from data */}
  {data.map((card)=>{
  const {title,description,mediaUrl} = data;//we are receiving an object not an array like the others, build two cards
  console.log(data);
  return(
  <article className="section__grid__card">
      {mediaUrl && (//one card for image
        <img src={mediaUrl}/>
      )||(//one card for details
        <div className="card">
          <h2 className="title" attribute="title">{title}</h2>
          <h3 className="description" attribute="description" dangerouslySetInnerHTML={{ __html: description }}/>
        </div>
      )
      }
    </article>
  )})}
}
</div>
)
}



const Services = ({data}) => (
<div className="section__grid">
{/**build cards from data */}
{data.map((card)=>{
const {title , description} = card;
console.warn(card && description)
return(
<article className="section__grid__card">
  <div className="card">
    <h2 className="title" attribute="title">{title}</h2>
    <h3 className="description" attribute="description">{description}</h3>
  </div>
</article>
)
})}
</div>
)


const Contact = ({data}) => (
<div className="section__grid">
{/**build cards from data */}
{data.map((card)=>{
const {title,value} = card;
return(
<article className="section__grid__card">
  <div className="card">
    <h2 className="title" attribute="title">{title}</h2>
    <h3 className="description" attribute="description">{value}</h3>
  </div>
</article>
)
})}
</div>
)

//ref components
const sections = {
projects: Projects,
skills: Skills,
about: About,
services: Services,
contact: Contact
}


// const Skills = () =>(
// <StaticQuery
//      query={graphql`
//       query SkillsQuery {
//           site {
//             siteMetadata {
//               mainPageContent {
//                 skills {
//                   title
//                   catagory
//                   summaryPoins
//                 }
//               }
//             }
//           }
//         }
//     `}
//     render={data => (
//     <>
//     {JSON.stringify(data)}
//     </>
//     )}
//   />
// );

export default SectionBuilder;