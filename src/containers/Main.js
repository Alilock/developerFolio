import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Greeting from "./greeting/Greeting";
import Skills from "./skills/Skills";
import StackProgress from "./skillProgress/skillProgress";
import WorkExperience from "./workExperience/WorkExperience";
import Projects from "./projects/Projects";
import StartupProject from "./StartupProjects/StartupProject";
import Achievement from "./achievement/Achievement";
import Blogs from "./blogs/Blogs";
import Talks from "./talks/Talks";
import Podcast from "./podcast/Podcast";
import Education from "./education/Education";
import ScrollToTopButton from "./topbutton/Top";
import Twitter from "./twitter-embed/twitter";
import email from "../assets/lottie/email";

import Profile from "./profile/Profile";
import SplashScreen from "./splashScreen/SplashScreen";
import { contactInfo, illustration, splashScreen } from "../portfolio";
import { StyleProvider } from "../contexts/StyleContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import "./Main.scss";
import { Fade } from "react-reveal";
import DisplayLottie from "../components/displayLottie/DisplayLottie";

const Main = () => {
  const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useLocalStorage("isDark", darkPref.matches);
  const [isShowingSplashAnimation, setIsShowingSplashAnimation] =
    useState(true);

  useEffect(() => {
    if (splashScreen.enabled) {
      const splashTimer = setTimeout(
        () => setIsShowingSplashAnimation(false),
        splashScreen.duration
      );
      return () => {
        clearTimeout(splashTimer);
      };
    }
  }, []);

  const changeTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={isDark ? "dark-mode" : null}>
      <StyleProvider value={{ isDark: isDark, changeTheme: changeTheme }}>
        {isShowingSplashAnimation && splashScreen.enabled ? (
          <SplashScreen />
        ) : (
          <>
            <Header />
            <Greeting />
            <Skills />
            <StackProgress />
            <Education />
            <WorkExperience />
            <Projects />
            <StartupProject />
            <Achievement />
            <Blogs />
            <Talks />
            <Twitter />
            <Podcast />
            <Profile />
            <Fade bottom duration={1000} distance="20px">
              <div className="main contact-margin-top" id="contact">
                <div className="contact-div-main">
                  <div className="contact-header">
                    <h1 className="heading contact-title">{contactInfo.title}</h1>
                    <p
                      className={
                        isDark
                          ? "dark-mode contact-subtitle"
                          : "subTitle contact-subtitle"
                      }
                    >
                      {contactInfo.subtitle}
                    </p>
                    <div
                      className={
                        isDark ? "dark-mode contact-text-div" : "contact-text-div"
                      }
                    >
                      {contactInfo.number && (
                        <>
                          <a
                            className="contact-detail"
                            href={"tel:" + contactInfo.number}
                          >
                            {contactInfo.number}
                          </a>
                          <br />
                          <br />
                        </>
                      )}
                      <a
                        className="contact-detail-email"
                        href={"mailto:" + contactInfo.email_address}
                      >
                        {contactInfo.email_address}
                      </a>
                      <br />
                      <br />
                      {/* <SocialMedia /> */}
                    </div>
                  </div>
                  <div className="contact-image-div">
                    {illustration.animated ? (
                      <DisplayLottie animationData={email} />
                    ) : (
                      <img
                        alt="Man working"
                        src={require("../assets/images/contactMailDark.svg")}
                      ></img>
                    )}
                  </div>
                </div>
              </div>
            </Fade>
            <ScrollToTopButton />
          </>
        )}
      </StyleProvider>
    </div>
  );
};

export default Main;
