---
template: BlogPost
path: /workflow/with-code
date: 2020-05-03T07:19:12.342Z
title: Hello world
thumbnail: /assets/flow.jpg
metaDescription: workflow
---

### Hello world

This is filler content, workflow blogs will be about tools, scripts, and anything that's helped speed up work and project development.

### Code snippet example

```javascript
import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Navigation from "../components/navigation";

export default ({ children }) => {
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
  );
  return (
    <div className="site-wrapper">
      <header className="site-header">
        <div className="site-title">
          <Link to="/">{data.site.siteMetadata.title}</Link>
        </div>
        <Navigation />
      </header>
      {children}
    </div>
  );
};
```
