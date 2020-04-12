
import React from "react"
import * as ReactDom from "react-dom"
import {StaticQuery,Link, graphql } from "gatsby"

//TODO: add a contentID that refs a blog article, or find a better workaround here
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
                  phone
                  email
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
    <h2 className="title">{title}</h2>
    <h3 className="description">{description}</h3>
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
  <div className="card__lid">
    <h2 className="title">{title}</h2>
    <h3 className="description">{description}</h3>
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


const About = ({data}) =>(
<div className="section__grid">
{/**build cards from data */}
{Object.keys(data).map((card)=>{
  const {title,description,mediaUrl} = data[card];
  return (
  <article className="section__grid__card">
      {mediaUrl && (
        <img src={mediaUrl}/>
      )||(
        <div className="card__lid">
          <h2 className="title">{title}</h2>
          <h3 className="description">{description}</h3>
        </div>
      )
      }
    </article>
  )
})
}
</div>
)



const Services = ({data}) => (
<div className="section__grid">
{/**build cards from data */}
{data.map((card)=>{
const {title,description} = card;
return(
<article className="section__grid__card">
  <div className="card__lid">
    <h2 className="title">{title}</h2>
    <h3 className="description">{description}</h3>
  </div>
</article>
)
})}
</div>
)


const Contact = ({data}) => (
<div className="section__grid">
{/**build cards from data */}
{Object.keys(data).map((card)=>{
const {phone,email} = data[card];
return(
<article className="section__grid__card">
  <div className="card__lid">
    <h2 className="title">{card}</h2>
    <h3 className="description">{phone?phone:email}</h3>
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