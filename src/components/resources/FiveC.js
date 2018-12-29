import uuid from "uuid/v1";
// CONVERT
import introToIntrapreneurship from "./slideshows/introToIntrapreneurship";
import introToIntrapreneurshipDL from "../../img/slides/convert/Intrapreneurship Intro Slides .pptx";
import socintDef from "../../img/slides/convert/Socint Definition.jpeg";
import painPoints from "../../img/slides/convert/PainPoints.jpg";
// CREATE
import socintTriangle from "../../img/slides/create/Socint Triangle.jpeg";
import elevatorPitching from "../../img/slides/create/Elevator Pitching.jpg";
import productDef from "../../img/slides/create/Product Definition.jpg";
// CONSTRUCT
import ruPitch from "../../img/slides/construct/RU Pitch.jpg";
import ruOriginalPitch from "./slideshows/roundupOriginalPitch";
import ruOriginalPitchDL from "../../img/slides/construct/Original Pitch Deck Mar 15.pptx";
// COMMIT
import seniorApproach from "../../img/slides/commit/approaching a senior person.png";
import pitchOutcomes from "../../img/slides/commit/Pitch Outcomes.jpg";
// CONTROL
import ruPilotReview from "./slideshows/roundupPilotReview";
import ruPilotReviewDL from "../../img/slides/control/Barclays Roundup v2 .pptx";

const resources = [
  {
    name: "Convert",
    data: [
      {
        id: uuid(),
        resource: "Intro to Intrapreneurship",
        description:
          "A few slides which give a quick overview of intrapreneurship; useful when explaining what intrapreneurship is!",
        download: introToIntrapreneurshipDL,
        url: introToIntrapreneurship
      },
      {
        id: uuid(),
        resource: "Socint Definition",
        description:
          "Our definition of social intrapreneurship; useful when explaining what a social intrapreneur is! ",
        download: socintDef,
        url: socintDef
      },
      {
        id: uuid(),
        resource: "Intrapreneur Pain Points",
        description:
          "6 key organisational hurdles intrapreneurs must overcome to deliver; useful to know what the difficult moments are from the start of the journey so you can plan for them! ",
        download: painPoints,
        url: painPoints
      }
    ]
  },
  {
    name: "Create",
    data: [
      {
        id: uuid(),
        resource: "Socint Triangle",
        description:
          "When creating your idea you must make sure that it hits all 3 corners of our social intrapreneurship triangle: a clear business case, clear social impact and something which a prospective customer would want/need ",
        download: socintTriangle,
        url: socintTriangle
      },
      {
        id: uuid(),
        resource: "Email Elevator Pitching",
        description:
          "After you have shaped your idea it is useful to be able to explain it quickly and effectively. This template will show you how to build an email elevator pitch based on our own experiences",
        download: elevatorPitching,
        url: elevatorPitching
      },
      {
        id: uuid(),
        resource: "Product Definition (Business Model Canvas) ",
        description:
          "This template, based on the business model canvas, is useful for building your product idea out",
        download: productDef,
        url: productDef
      }
    ]
  },
  {
    name: "Construct",
    data: [
      {
        id: uuid(),
        resource: "Roundup Original Pitch",
        description:
          "The original (successful) Barclays Roundup Pitch deck which won the Barclays Intrapreneur Challenge in 2015, receiving funding for the idea. This shows you what sort of information you should include in your funding pitch",
        download: ruOriginalPitchDL,
        url: ruOriginalPitch
      },
      {
        id: uuid(),
        resource: "Roundup Summary",
        description:
          "This slide summarise how we pitched Barclays Roundup successfully",
        download: ruPitch,
        url: ruPitch
      }
    ]
  },
  {
    name: "Commit",
    data: [
      {
        id: uuid(),
        resource: "Approaching a Senior Person",
        description:
          "A real life example of an email template we used (successfully) to approach senior individuals",
        download: seniorApproach,
        url: seniorApproach
      },
      {
        id: uuid(),
        resource: "Pitch Outcomes",
        description:
          "Ahead of your pitch review this slide of 'pitch outcomes' and work out what your 'ideal outcome' would be. Ensure that you are ready, in advance, to answer both which outcome you want and why",
        download: pitchOutcomes,
        url: pitchOutcomes
      }
    ]
  },
  {
    name: "Control",
    data: [
      {
        id: uuid(),
        resource: "Roundup Pilot Review",
        description:
          "The original review of the Barclays Roundup internal Pilot and proposal to move this from MVP into full launch (i.e. moving from 'Commit' to 'Control' Phase using our 5C project lifecycle",
        download: ruOriginalPitchDL,
        url: ruPilotReview
      }
    ]
  }
];

export default resources;
