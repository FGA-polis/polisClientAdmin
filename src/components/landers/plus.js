import InputField from "material-ui/lib/text-field";
import React from "react";
import { connect } from "react-redux";
import { doSignin, doFacebookSignin } from "../../actions";
import { browserHistory } from "react-router";
import Radium from "radium";
import Awesome from "react-fontawesome";
import Flex from "../framework/flex";
import Button from "../framework/generic-button";
import StaticContentContainer from "../framework/static-content-container";
import Press from "./press";
import Benefit from "./benefit";

// import { Tweet } from 'react-twitter-widgets';

@connect()
@Radium
class Plus extends React.Component {
  styles() {
    return {
      container: {
        minWidth: "100vw",
        zIndex: 10
      },
      sectionColor: {
        minWidth: "100vw",
        backgroundColor: "#03a9f4",
        color: "white",
      },
      hero: {
        fontSize: 48,
        lineHeight: 1.4,
        textTransform: 'uppercase',
        maxWidth: 900,
        padding: "0px 40px",
        zIndex: 10,
        textAlign: 'center',
      },
      heroSub: {
        fontSize: 24,
        lineHeight: 1.6,
        textAlign: 'center',
        fontWeight: 300,
        margin: 0,
        padding: "0px 40px",
        maxWidth: 700,
        zIndex: 10,
      },
      callToAction: {
        width: "100vw",
        padding: "50px 0px 70px 0px",
        backgroundColor: "#03a9f4",
      },
      getStartedButton: {
        backgroundColor: "rgb(255,191,31)",
        color: "white"
      },
      body: {
        padding: 40
      },
      section: {
        padding: 0,
      },
      bandSection: {
        backgroundColor: "#03a9f4",
        color: "white",
        width: "100vw",
        padding: "30px 0px"
      },
      sectionHeader: {
        fontSize: 24,
        marginBottom: 0,
      },
      sectionBody: {
        maxWidth: 500,
        fontWeight: 300,
        lineHeight: 1.5
      },
      button: {
        backgroundColor: "white",
        color: "rgb(100,100,100)"
      },
      flexTestContainer: {
        minHeight: "100%"
      },
      flexTestDiv: {
        backgroundColor: "red",
        color: "white",
        minHeight: 50,
        width: "100%",
      }
    }
  }
  handleGetStartedClicked(r) {
    return () => {
      browserHistory.push(r);
    };
  }
  render() {
    return (
      <StaticContentContainer
        backgroundColor={"#03a9f4"}
        headerBackgroundColor={"#03a9f4"}
        footerBackgroundColor={"#03a9f4"}
        image={false}
        stars={{visible: true, color: "darkgrey"}}>
        {/* hero */}
        <Flex
          direction="column"
          alignItems="center"
          grow="1"
          styleOverrides={this.styles().sectionColor}>
            <p style={this.styles().hero}>
              { "Crowd Intelligence" }
            </p>
            <p style={this.styles().heroSub}>
              Meet pol.is: an AI powered sentiment gathering platform.
              More organic than surveys, less effort than focus groups.
            </p>
        </Flex>
        {/* upper cta */}
        <Flex styleOverrides={this.styles().callToAction}>
          <Button
            onClick={this.handleGetStartedClicked("createuser")}
            style={this.styles().getStartedButton}> Get started </Button>
        </Flex>
        <Press/>

<p> polis leverages techniques from both quantitative and qualitative research, combined with powerful analytics, to gather feedback that is simultaneously authentic to the population being surveyed and data rich. </p>
      <Flex
        styleOverrides={{padding: "20px 40px"}}
        justifyContent="space-around"
        wrap="wrap"
        alignItems="baseline">
        <Benefit
          heading={"Scalable feedback"}
          body={`
            Whether you have hundreds of people or hundreds of thousands, pol.is can help you figure out what they think with little to no burden on you.
            `}/>
        <Benefit
          heading={"Unbiased"}
          body={`
            Respondents are scoring themselves on statements created by other respondents, not what was already in the survey creator's head
            `}/>
        <Benefit
          heading={"Effortless"}
          body={`
            Ask a question and let pol.is produce insights automatically
            `}/>
        <Benefit
          heading={"Organic"}
          body={`
            The results from pol.is are emergent - they are a better reflection of the state of mind of participants than surveys are - and frequently surprising
            `}/>
        <Benefit
          heading={"Usable data"}
          body={`
            Pol.is layers quantitative data onto qualitative data - it's both rich and usable. Your data is yours: run a data export at any time to get the raw data in csv form. Cross reference your data with opinion groups pol.is produces.
            `}/>
        <Benefit
          heading={"API"}
          body={`
            The pol.is api allows you to automate and script conversations
            `}/>
      </Flex>

      </StaticContentContainer>
    );
  }
}

export default Plus;

// <Benefit
//   heading={"Auto-correlation tool (coming soon)"}
//   body={`
//     Upload your data, let pol.is automatically surface correlations with opinion groups
//     `}/>
