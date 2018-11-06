document.addEventListener('DOMContentLoaded', onLoad);

function onLoad() {

  const inputElement = document.querySelector('#input');
  const outputElement = document.querySelector('#output');
  const validateButton = document.querySelector('#validate');

  const doc = getExampleDocument();
  inputElement.value = JSON.stringify(doc, undefined, 2);

  validateButton.addEventListener('click', () => {

    postData(`/validate`, inputElement.value)
      .then(data => {
        console.log(data);
        let output = JSON.stringify(data, undefined, 2);
        console.log(output);
        outputElement.value = output;
      })
      .catch(error => console.error(error));

  });
}


function postData(url = ``, data = {}) {
  // Default options are marked with *
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: data, // body data type must match "Content-Type" header
  })
    .then(response => response.json()); // parses response to JSON
}


function getExampleDocument() {
  //Add JSON example to input
  return {
    "@context": {
      "@vocab": "http:\/\/schema.org\/",
      "gdx": "https:\/\/geodex.org\/voc\/",
      "datacite": "http:\/\/purl.org\/spar\/datacite\/",
      "earthcollab": "https:\/\/library.ucar.edu\/earthcollab\/schema#",
      "geolink": "http:\/\/schema.geolink.org\/1.0\/base\/main#",
      "geolink-vocab": "http:\/\/schema.geolink.org\/1.0\/voc\/local#",
      "vivo": "http:\/\/vivoweb.org\/ontology\/core#"
    },
    "@id": "https:\/\/www.bco-dmo.org\/dataset\/685783",
    "identifier": [
      "http:\/\/lod.bco-dmo.org\/id\/dataset\/685783",
      {
        "@type": "PropertyValue",
        "additionalType": [
          "http:\/\/schema.geolink.org\/1.0\/base\/main#Identifier",
          "http:\/\/purl.org\/spar\/datacite\/Identifier"
        ],
        "@id": "https:\/\/doi.org\/10.1575\/1912\/bco-dmo.685952",
        "propertyID": "http:\/\/purl.org\/spar\/datacite\/doi",
        "value": "10.1575\/1912\/bco-dmo.685952",
        "url": "https:\/\/doi.org\/10.1575\/1912\/bco-dmo.685952"
      }
    ],
    "url": "https:\/\/www.bco-dmo.org\/dataset\/685783",
    "@type": "Dataset",
    "name": "Carbon flux for the Caribbean giant barrel sponge Xestospongia muta (Sponge-loop)",
    "additionalType": [
      "http:\/\/schema.geolink.org\/1.0\/base\/main#Dataset",
      "http:\/\/vivoweb.org\/ontology\/core#Dataset"
    ],
    "alternateName": "Carbon flux",
    "description": {
      "@type": "HTML",
      "@value": "\u0026lt;p\u0026gt;This dataset includes flux measurements of dissolved, particulate and total organic carbon associated with the Caribbean giant barrel sponge \u0026lt;em\u0026gt;Xestospongia muta\u0026lt;\/em\u0026gt; on Conch Reef, Key Largo, FL in June 2013.\u0026lt;\/p\u0026gt;"
    },
    "datePublished": "2017-03-27",
    "keywords": "benthic pelagic coupling, Dissolved Organic Carbon, particulate organic carbon, Porifera, benthic suspension feeding, biota, oceans",
    "creator": [
      {
        "@type": "Role",
        "additionalType": "http:\/\/schema.geolink.org\/1.0\/base\/main#Participant",
        "roleName": "Principal Investigator",
        "creator": {
          "@type": "Person",
          "additionalType": "http:\/\/schema.geolink.org\/1.0\/base\/main#Person",
          "@id": "https:\/\/www.bco-dmo.org\/person\/676145",
          "name": "Christopher Finelli",
          "url": "https:\/\/www.bco-dmo.org\/person\/676145",
          "identifier": {
            "@type": "PropertyValue",
            "additionalType": [
              "http:\/\/schema.geolink.org\/1.0\/base\/main#Identifier",
              "http:\/\/purl.org\/spar\/datacite\/Identifier"
            ],
            "propertyID": "http:\/\/purl.org\/spar\/datacite\/orcid",
            "value": "0000-0002-4034-5201",
            "url": "https:\/\/orcid.org\/0000-0002-4034-5201"
          }
        }
      },
      {
        "@type": "Role",
        "additionalType": "http:\/\/schema.geolink.org\/1.0\/base\/main#Participant",
        "roleName": "Co-Principal Investigator",
        "creator": {
          "@type": "Person",
          "additionalType": "http:\/\/schema.geolink.org\/1.0\/base\/main#Person",
          "@id": "https:\/\/www.bco-dmo.org\/person\/685690",
          "name": "Steven McMurray",
          "url": "https:\/\/www.bco-dmo.org\/person\/685690",
          "identifier": {
            "@type": "PropertyValue",
            "additionalType": [
              "http:\/\/schema.geolink.org\/1.0\/base\/main#Identifier",
              "http:\/\/purl.org\/spar\/datacite\/Identifier"
            ],
            "propertyID": "http:\/\/purl.org\/spar\/datacite\/orcid",
            "value": "0000-0002-1187-5916",
            "url": "https:\/\/orcid.org\/0000-0002-1187-5916"
          }
        }
      },
      {
        "@type": "Role",
        "additionalType": "http:\/\/schema.geolink.org\/1.0\/base\/main#Participant",
        "roleName": "Co-Principal Investigator",
        "creator": {
          "@type": "Person",
          "additionalType": "http:\/\/schema.geolink.org\/1.0\/base\/main#Person",
          "@id": "https:\/\/www.bco-dmo.org\/person\/632984",
          "name": "Dr Joseph Pawlik",
          "url": "https:\/\/www.bco-dmo.org\/person\/632984",
          "identifier": {
            "@type": "PropertyValue",
            "additionalType": [
              "http:\/\/schema.geolink.org\/1.0\/base\/main#Identifier",
              "http:\/\/purl.org\/spar\/datacite\/Identifier"
            ],
            "propertyID": "http:\/\/purl.org\/spar\/datacite\/orcid",
            "value": "0000-0002-8559-8456",
            "url": "https:\/\/orcid.org\/0000-0002-8559-8456"
          }
        }
      }
    ],
    "citation": "Finelli, C., Pawlik, J., McMurray, S. (2017) Carbon flux for the Caribbean giant barrel sponge Xestospongia muta (Sponge-loop). Biological and Chemical Oceanography Data Management Office (BCO-DMO). Dataset version 2017-03-27 [if applicable, indicate subset used]. doi:10.1575\/1912\/bco-dmo.685952 [access date]",
    "version": "2017-03-27",
    "license": "http:\/\/creativecommons.org\/licenses\/by\/4.0\/",
    "publishingPrinciples": {
      "@type": "DigitalDocument",
      "@id": "http:\/\/creativecommons.org\/licenses\/by\/4.0\/",
      "additionalType": "https:\/\/geodex.org\/voc\/Protocol-License",
      "name": "Dataset Usage License",
      "url": "http:\/\/creativecommons.org\/licenses\/by\/4.0\/"
    },
    "temporalCoverage": "2013-05-01\/2013-05-01",
    "spatialCoverage": {
      "@type": "Place",
      "geo": {
        "@type": "GeoShape",
        "box": "24.94972,-80.45361 24.94972,-80.45361",
        "polygon": "24.94972,-80.45361 24.94972,-80.45361 24.94972,-80.45361 24.94972,-80.45361 24.94972,-80.45361"
      },
      "subjectOf": {
        "@type": "CreativeWork",
        "fileFormat": "application\/vnd.geo+json",
        "text": "{\u0022type\u0022:\u0022Feature\u0022,\u0022geometry\u0022:{\u0022type\u0022:\u0022Polygon\u0022,\u0022coordinates\u0022:[[[-80.45361,24.94972],[-80.45361,24.94972],[-80.45361,24.94972],[-80.45361,24.94972],[-80.45361,24.94972]]],\u0022properties\u0022:[]}}"
      },
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "alternateName": "CRS",
          "name": "Coordinate Reference System",
          "value": "http:\/\/www.opengis.net\/def\/crs\/OGC\/1.3\/CRS84"
        },
        {
          "@type": "PropertyValue",
          "value": "POLYGON ((-80.45361 24.94972, -80.45361 24.94972, -80.45361 24.94972, -80.45361 24.94972, -80.45361 24.94972))",
          "propertyID": "http:\/\/www.opengis.net\/ont\/geosparql#wktLiteral",
          "name": "Well-Known Text",
          "alternateName": "WKT"
        }
      ]
    },
    "publisher": {
      "@id": "https:\/\/www.bco-dmo.org",
      "@type": "Organization",
      "additionalType": "http:\/\/schema.geolink.org\/1.0\/base\/main#Organization",
      "legalName": "Biological and Chemical Data Management Office",
      "name": "BCO-DMO",
      "identifier": "http:\/\/lod.bco-dmo.org\/id\/affiliation\/191",
      "url": "https:\/\/www.bco-dmo.org",
      "sameAs": "http:\/\/www.re3data.org\/repository\/r3d100000012"
    },
    "provider": {
      "@id": "https:\/\/www.bco-dmo.org"
    },
    "includedInDataCatalog": [
      {
        "@id": "http:\/\/www.bco-dmo.org\/datasets"
      }
    ],
    "isPartOf": [
      {
        "@type": "CreativeWork",
        "additionalType": "https:\/\/library.ucar.edu\/earthcollab\/schema#Project",
        "@id": "https:\/\/www.bco-dmo.org\/project\/676143",
        "name": "Testing the sponge-loop hypothesis for Caribbean coral reefs",
        "alternateName": "sponge-loop",
        "description": {
          "@type": "HTML",
          "@value": "NSF Abstract:\nSponges are bottom-dwelling animals that dominate Caribbean reefs now that reef-building corals have been declining for decades. Sponges feed by filtering huge volumes of seawater, providing a mechanism for recycling organic material back to the reef. A new theory has been proposed called the \u0026quot;sponge-loop hypothesis\u0026quot; that is potentially the most important new concept in marine ecology in many years, because it seeks to explain Darwin\u0027s Paradox: how do highly productive and diverse coral reefs grow in desert-like tropical seas? The sponge loop hypothesis proposes that sponges on coral reefs absorb the large quantities of dissolved organic carbon (molecules such as carbohydrates) that are released by seaweeds and corals and return it to the reef as particles in the form of living and dead cells, or other cellular debris. This project will use a rigorous set of techniques to test the sponge-loop hypothesis in the field on ten of the largest and most common sponges on Caribbean reefs. For each species, the contributions of particles and dissolved organic carbon to sponge nutrition will be measured, as well as the production of cellular particles in the seawater flowing out of the sponge. For selected sponge species, the concentration of dissolved organic carbon entering the sponge will be experimentally enhanced to determine the capacity of the sponge to absorb this potential food source, and to gauge its effect on the production of cellular particles. This project will provide STEM education and training for postdoctoral, graduate and undergraduate students and public outreach in the form of easily accessible educational videos. Further, this project is important for understanding the carbon cycle on coral reefs where the effects of climate change and ocean acidification may be tipping the competitive balance toward non-reef-building organisms, such as sponges.\nThe cycling of carbon from the water-column to the benthos is central to marine ecosystem function; for coral reefs, this process begins with photosynthesis by seaweeds and coral symbionts, which then exude a substantial portion of fixed carbon as dissolved organic carbon (DOC) that may be lost to currents and tides. But if sponges, with their enormous water filtering capacity, can return DOC from the water column to the reef, it would represent a major unrecognized source of carbon cycling. The \u0026quot;sponge-loop hypothesis\u0026quot; has the potential to transform our understanding of carbon cycling on coral reefs. Building on preliminary data from studies of the giant barrel sponge, this project will investigate each of the three components of the sponge-loop hypothesis for ten common barrel, vase and tube-forming species that span a range of associations with microbial symbionts, from high microbial abundance (HMA) to low microbial abundance (LMA) in the sponge tissue. Specifically, the experimental approach will include InEx techniques (comparative sampling of seawater immediately before and after passage through the sponge), velocimetry, and flow cytometry to determine whether each species consumes DOC and produces particulate organic carbon (POC) in the form of cellular detritus. Then, for species that consume DOC, the same techniques will be used in manipulative experiments that augment the amount of DOC from three categories (labile, semi-labile and refractory) to determine the types of DOC consumed by sponges. In addition to testing the sponge-loop hypothesis, this project will use molecular techniques to investigate the differences among HMA and LMA sponge species, targeting the microbial symbionts that may be responsible for DOC uptake.\n"
        },
        "url": "https:\/\/www.bco-dmo.org\/project\/676143"
      }
    ],
    "distribution": [
      {
        "@type": "DataDownload",
        "@id": "https:\/\/www.bco-dmo.org\/dataset\/685783\/data\/download",
        "contentUrl": "https:\/\/www.bco-dmo.org\/dataset\/685783\/data\/download",
        "fileFormat": "text\/tab-separated-values",
        "datePublished": "2017-03-27",
        "inLanguage": "en-US"
      },
      {
        "@type": "DataDownload",
        "contentUrl": "https:\/\/www.bco-dmo.org\/dataset\/685783\/datapackage.json",
        "fileFormat": "application\/vnd.datapackage+json"
      }
    ],
    "measurementTechnique": [
      "Elemental Analyzer"
    ],
    "variableMeasured": [
      {
        "@type": "PropertyValue",
        "additionalType": "https:\/\/library.ucar.edu\/earthcollab\/schema#Parameter",
        "@id": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685798",
        "name": "Spongeid",
        "description": "unique identifier for each sponge sampled\n",
        "url": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685798",
        "unitText": "unitless"
      },
      {
        "@type": "PropertyValue",
        "additionalType": "https:\/\/library.ucar.edu\/earthcollab\/schema#Parameter",
        "@id": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685799",
        "name": "Watersampdate",
        "description": "date of water sample formatted as yyyy-mm-dd\n",
        "url": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685799",
        "unitText": "unitless"
      },
      {
        "@type": "PropertyValue",
        "additionalType": "https:\/\/library.ucar.edu\/earthcollab\/schema#Parameter",
        "@id": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685800",
        "name": "Spongevolume",
        "description": "volume of each sponge\n",
        "url": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685800",
        "unitText": "cubic centimeters (cm3)"
      },
      {
        "@type": "PropertyValue",
        "additionalType": "https:\/\/library.ucar.edu\/earthcollab\/schema#Parameter",
        "@id": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685801",
        "name": "Volflow",
        "description": "volume flow (i.e pumping rate) for each sponge\n",
        "url": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685801",
        "unitText": "milliliters\/second (ml\/s)"
      },
      {
        "@type": "PropertyValue",
        "additionalType": "https:\/\/library.ucar.edu\/earthcollab\/schema#Parameter",
        "@id": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685802",
        "name": "DOCin",
        "description": "dissolved organic carbon in incurrent water samples\n",
        "url": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685802",
        "unitText": "micromolar (uM)"
      },
      {
        "@type": "PropertyValue",
        "additionalType": "https:\/\/library.ucar.edu\/earthcollab\/schema#Parameter",
        "@id": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685803",
        "name": "DOCex",
        "description": "dissolved organic carbon in excurrent water samples\n",
        "url": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685803",
        "unitText": "micromolar (uM)"
      },
      {
        "@type": "PropertyValue",
        "additionalType": "https:\/\/library.ucar.edu\/earthcollab\/schema#Parameter",
        "@id": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685804",
        "name": "DOCconsumed",
        "description": "dissolved organic carbon consumed by sponges\n",
        "url": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685804",
        "unitText": "micromolar (uM)"
      },
      {
        "@type": "PropertyValue",
        "additionalType": "https:\/\/library.ucar.edu\/earthcollab\/schema#Parameter",
        "@id": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685805",
        "name": "DOCre",
        "description": "sponge retention efficiency for dissolved organic carbon\n",
        "url": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685805",
        "unitText": "percent"
      },
      {
        "@type": "PropertyValue",
        "additionalType": "https:\/\/library.ucar.edu\/earthcollab\/schema#Parameter",
        "@id": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685806",
        "name": "frDOC",
        "description": "sponge filtration rate of dissolved organic carbon\n",
        "url": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685806",
        "unitText": "micromoles\/second (umol\/s)"
      },
      {
        "@type": "PropertyValue",
        "additionalType": "https:\/\/library.ucar.edu\/earthcollab\/schema#Parameter",
        "@id": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685807",
        "name": "spFRdoc",
        "description": "specific sponge filtration rate of dissolved organic carbon\n",
        "url": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685807",
        "unitText": "micromoles\/second\/liter (umol\/s\/L sponge)"
      },
      {
        "@type": "PropertyValue",
        "additionalType": "https:\/\/library.ucar.edu\/earthcollab\/schema#Parameter",
        "@id": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685808",
        "name": "POCin",
        "description": "particulate organic carbon in incurrent water samples\n",
        "url": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685808",
        "unitText": "micromolar (uM)"
      },
      {
        "@type": "PropertyValue",
        "additionalType": "https:\/\/library.ucar.edu\/earthcollab\/schema#Parameter",
        "@id": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685809",
        "name": "POCex",
        "description": "particulate organic carbon in excurrent water samples\n",
        "url": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685809",
        "unitText": "micromolar (uM)"
      },
      {
        "@type": "PropertyValue",
        "additionalType": "https:\/\/library.ucar.edu\/earthcollab\/schema#Parameter",
        "@id": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685810",
        "name": "POCconsumed",
        "description": "particulate organic carbon consumed by sponges\n",
        "url": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685810",
        "unitText": "micromolar (uM)"
      },
      {
        "@type": "PropertyValue",
        "additionalType": "https:\/\/library.ucar.edu\/earthcollab\/schema#Parameter",
        "@id": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685811",
        "name": "POCre",
        "description": "sponge retention efficiency for particulate organic carbon\n",
        "url": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685811",
        "unitText": "percent"
      },
      {
        "@type": "PropertyValue",
        "additionalType": "https:\/\/library.ucar.edu\/earthcollab\/schema#Parameter",
        "@id": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685812",
        "name": "frPOC",
        "description": "sponge filtration rate of particulate organic carbon\n",
        "url": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685812",
        "unitText": "micromoles\/second (umol\/s)"
      },
      {
        "@type": "PropertyValue",
        "additionalType": "https:\/\/library.ucar.edu\/earthcollab\/schema#Parameter",
        "@id": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685813",
        "name": "spFRpoc",
        "description": "specific sponge filtration rate of particulate organic carbon\n",
        "url": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685813",
        "unitText": "micromoles\/second\/liter (umol\/s\/L sponge)"
      },
      {
        "@type": "PropertyValue",
        "additionalType": "https:\/\/library.ucar.edu\/earthcollab\/schema#Parameter",
        "@id": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685814",
        "name": "TOCin",
        "description": "total organic carbon in incurrent water samples\n",
        "url": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685814",
        "unitText": "micromolar (uM)"
      },
      {
        "@type": "PropertyValue",
        "additionalType": "https:\/\/library.ucar.edu\/earthcollab\/schema#Parameter",
        "@id": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685815",
        "name": "TOCex",
        "description": "total organic carbon in excurrent water samples\n",
        "url": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685815",
        "unitText": "micromolar (uM)"
      },
      {
        "@type": "PropertyValue",
        "additionalType": "https:\/\/library.ucar.edu\/earthcollab\/schema#Parameter",
        "@id": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685816",
        "name": "TOCconsumed",
        "description": "total organic carbon consumed by sponges\n",
        "url": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685816",
        "unitText": "micromolar (uM)"
      },
      {
        "@type": "PropertyValue",
        "additionalType": "https:\/\/library.ucar.edu\/earthcollab\/schema#Parameter",
        "@id": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685817",
        "name": "TOCre",
        "description": "sponge retention efficiency for total organic carbon\n",
        "url": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685817",
        "unitText": "percent"
      },
      {
        "@type": "PropertyValue",
        "additionalType": "https:\/\/library.ucar.edu\/earthcollab\/schema#Parameter",
        "@id": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685818",
        "name": "frTOC",
        "description": "sponge filtration rate of total organic carbon\n",
        "url": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685818",
        "unitText": "micromoles\/second (umol\/s)"
      },
      {
        "@type": "PropertyValue",
        "additionalType": "https:\/\/library.ucar.edu\/earthcollab\/schema#Parameter",
        "@id": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685819",
        "name": "spFRtoc",
        "description": "specific sponge filtration rate of total organic carbon\n",
        "url": "https:\/\/www.bco-dmo.org\/dataset-parameter\/685819",
        "unitText": "micromoles\/second\/liter (umol\/s\/L sponge)"
      }
    ],
    "funder": [
      {
        "@type": "Organization",
        "additionalType": "http:\/\/schema.geolink.org\/1.0\/base\/main#Organization",
        "legalName": "NSF Division of Ocean Sciences",
        "name": "NSF OCE",
        "makesOffer": [
          {
            "@id": "https:\/\/www.bco-dmo.org\/award\/676142",
            "@type": "Offer",
            "additionalType": "http:\/\/schema.geolink.org\/1.0\/base\/main#Award",
            "name": "OCE-1558580",
            "url": "https:\/\/www.bco-dmo.org\/award\/676142",
            "sameAs": "http:\/\/www.nsf.gov\/awardsearch\/showAward.do?AwardNumber=1558580",
            "offeredBy": {
              "@type": "Person",
              "@id": "https:\/\/www.bco-dmo.org\/person\/50446",
              "additionalType": "http:\/\/schema.geolink.org\/1.0\/voc\/local#roletype_program_manager",
              "name": "Dr Michael E. Sieracki",
              "url": "https:\/\/www.bco-dmo.org\/person\/50446"
            }
          }
        ]
      }
    ],
    "gdx:fundedBy": [
      {
        "@id": "https:\/\/www.bco-dmo.org\/award\/676142"
      }
    ]
  };


};