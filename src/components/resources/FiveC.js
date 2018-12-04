import uuid from "uuid/v1";
// CONVERT
import introToIntrapreneurship from "./slideshows/introToIntrapreneurship";
import socintDef from "../../img/slides/convert/Socint Definition.jpeg";
import painPoints from "../../img/slides/convert/PainPoints.jpg";
// CREATE
import socintTriangle from "../../img/slides/create/Socint Triangle.jpeg";
import elevatorPitching from "../../img/slides/create/Elevator Pitching.jpg";
import productDef from "../../img/slides/create/Product Definition.jpg";
// CONSTRUCT
import ruPitch from "../../img/slides/construct/RU Pitch.jpg";
import ruOriginalPitch from "./slideshows/roundupOriginalPitch";
// COMMIT
import seniorApproach from "../../img/slides/commit/approaching a senior person.png";
import pitchOutcomes from "../../img/slides/commit/Pitch Outcomes.jpg";
// CONTROL
import ruPilotReview from "./slideshows/roundupPilotReview";

const resources = [
  {
    name: "convert",
    data: [
      {
        id: uuid(),
        resource: "Intro to Intrapreneurship",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        download: "",
        url: introToIntrapreneurship
      },
      {
        id: uuid(),
        resource: "Socint Definition",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        download: "",
        url: socintDef
      },
      {
        id: uuid(),
        resource: "Intrapreneur Pain Points",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        download: "",
        url: painPoints
      }
    ]
  },
  {
    name: "create",
    data: [
      {
        id: uuid(),
        resource: "Socint Triangle",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        download: "",
        url: socintTriangle
      },
      {
        id: uuid(),
        resource: "Email Elevator Pitching",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        download: "",
        url: elevatorPitching
      },
      {
        id: uuid(),
        resource: "Product Definition",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        download: "",
        url: productDef
      }
    ]
  },
  {
    name: "construct",
    data: [
      {
        id: uuid(),
        resource: "Roundup Original Pitch",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        download: "",
        url: ruOriginalPitch
      },
      {
        id: uuid(),
        resource: "Roundup Summary",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        download: "",
        url: ruPitch
      }
    ]
  },
  {
    name: "commit",
    data: [
      {
        id: uuid(),
        resource: "Approaching a Senior Person",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        download: "",
        url: seniorApproach
      },
      {
        id: uuid(),
        resource: "Pitch Outcomes",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        download: "",
        url: pitchOutcomes
      }
    ]
  },
  {
    name: "control",
    data: [
      {
        id: uuid(),
        resource: "Roundup Pilot Review",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        download: "",
        url: ruPilotReview
      }
    ]
  }
];

export default resources;
