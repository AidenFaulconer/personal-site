import React, { useEffect, useRef, useState, Suspense } from "react";
import * as axios from "axios";

export const CorsHack = "https://cors-anywhere.herokuapp.com/"; // TODO: find a more reliable server to proxy from

export const reqToken = {
  Body: {
    client_id: "993e21bfeec545e4a093b6945da04627",
    client_secret: "732c897cbe214d228bf5bd619ada8b8b", // dont care if my spotify data is public, I would never do this with sensative data
    grant_type: "client_credentials",
    scope: "user-read-currently-playing"
  }
};

// threeComponent wrapper
export default React.memo(() => {
  const lastListenedRef = useRef(null);

  // stages of data requesting
  const [spotifyData, setSpotifyData] = useState(false);
  const [authorization, setAuthorizatiion] = useState(false);

  const getHashParams = () => {
    const hashParams = {};
    let e;
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  };

  const getToken = () => {
    axios
      .post(`${CorsHack}https://accounts.spotify.com/api/token`, reqToken)
      .then(res => setAuthorizatiion(res))
      .catch(err => console.error(err));
  };

  const getRecentSong = token => {
    token = `Bearer ${token}`;
    const reqRecentSong = {
      Header: { Authorization: token }
    };

    axios
      .get(
        `${CorsHack}https://api.spotify.com/v1/me/player/currently-playing`,
        reqRecentSong
      )
      .then(res => setSpotifyData(res))
      .catch(err => console.error(err));
  };

  // componentDidMount
  useEffect(() => {
    // fetch last listened to
    getToken();
    // oncomponent unmount
    return () => {}; // preserve data
  }, []); // request data

  useEffect(() => getRecentSong(authorization), [authorization]); // handle authorization
  useEffect(() => console.log(spotifyData), [spotifyData]); // final stage

  // suspense makes this component asynchronous, since nothing mounts from the <suspense></suspense>
  // tags wrapping everything this component outputs, hacky workaround used to get this to render server side properly
  return (
    <>
      {/** spotifyData && <div ref={lastListenedRef} id="canvas" /> */}
      <audio id="audio" controls src="./sounds/Whippin.mp3" />
    </>
  );
});
