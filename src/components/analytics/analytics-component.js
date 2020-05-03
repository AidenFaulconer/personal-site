import Analytics from "analytics";
import googleAnalytics from "@analytics/google-analytics";
// import customerIo from "@analytics/customerio";
import React, { useEffect, useState } from "react";
// https://www.npmjs.com/package/analytics?activeTab=readme

export default () => {
  // componentDidMount
  useEffect(() => {
    // #region  detect mobile view and configure threejs
    // check the device type the user has. TODO: change configuration to optimize for mobile and tablet useage better
    /* Initialize analytics */
    const analytics = Analytics({
      app: "my-app-name",
      version: 100,
      plugins: [
        googleAnalytics({
          trackingId: "UA-154496526-1"
        })
        //   customerIo({
        //     siteId: "123-xyz"
        //   })
      ]
    });

    /* Track a page view */
    analytics.page();

    /* Track a custom event */
    // analytics.track('userPurchase', {
    //   price: 20
    //   item: 'pink socks'
    // })

    /* Identify a visitor */
    //  analytics.identify("UA-154496526-1", {
    //    firstName: "aiden",
    //    lastName: "faulconer",
    //    email: "aidenf09@gmail.com"
    //  });

    analytics.enablePlugin("google");

    // Enable multiple plugins at once
    //  analytics.enablePlugin(["google", "segment"]);
    // oncomponent unmount
    return () => {}; // preserve context
  }, []);

  return <div />;
};
