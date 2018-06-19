##### RED Interactive Agency - Ad Technology

[![npm (tag)](https://img.shields.io/npm/v/@ff0000-ad-tech%2Fad-velvet.svg?style=flat-square)](https://www.npmjs.com/package/@ff0000-ad-tech%2Fad-velvet)
[![GitHub issues](https://img.shields.io/github/issues/ff0000-ad-tech/ad-velvet.svg?style=flat-square)](https://github.com/ff0000-ad-tech/ad-velvet)
[![npm downloads](https://img.shields.io/npm/dm/@ff0000-ad-tech%2Fad-velvet.svg?style=flat-square)](https://www.npmjs.com/package/@ff0000-ad-tech%2Fad-velvet)

[![GitHub contributors](https://img.shields.io/github/contributors/ff0000-ad-tech/ad-velvet.svg?style=flat-square)](https://github.com/ff0000-ad-tech/ad-velvet/graphs/contributors/)
[![npm license](https://img.shields.io/npm/l/@ff0000-ad-tech%2Fad-velvet.svg?style=flat-square)](https://github.com/ff0000-ad-tech/ad-velvet/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[Getting Started](#getting-started)

[Guides](#guides)

[Concepts](#concepts)

[API](#api)

### Velvet CMP

![Velvet Logo](https://github.com/ff0000-ad-tech/readme-assets/blob/master/ad-velvet/velvet-logo.png)

The Velvet Platform is a licensable, web-based, CMP living at https://www.velvet.tech/. It manages data which is then consumed by ad units, depending on their placement / schedule / target.

### Velvet Enabler

This project includes the frontend for the Velvet CMP -- it enables creative units to load & respond dynamically to sub-loaded Velvet feed.

Velvet Ads can be built according to your preference:

- NPM / ES6 / Webpack
- Vanilla Javascript
- Google Web Designer

## Getting Started

<a name="getting-started"></a>
Models for "Ad Data" are built using the Velvet Platform. For this, you will need a Velvet account. Go to https://www.velvet.tech/ for more information.

Velvet-compatible ads include `velvet-enabler.js`, either compiled, inlined, or as a script load. How you get that file depends on your packaging work-flow. We recommend NPM.

#### NPM

`npm install @ff0000-ad-tech/ad-velvet --save`

#### Manual

Browse to one of the [Javascript distributions](https://github.com/ff0000-ad-tech/ad-velvet/tree/feature/enabler/dist), copy-and-paste the code into a local file named `velvet-enabler.js`.

## Guides
<a name="guides"></a>

### Including Velvet

##### ES6

##### Vanilla

##### GWD

### Targeting Data

### Listening for Events

### Adding Date Settings

## Concepts
<a name="concepts"></a>

Programatic advertising enables Brands to reach specific demographics with a specific impression & message. 

Content Management Platforms (CMP's) are the mechanism that help brand managers organize creative according to those targets. Some popular options are:

- DoubleClick Studio (Google Dynamic Content)
- Flashtalking
- Sizmek

There are many others. How is Velvet different?

1. __Velvet has powerful tools for modeling data.__ 
Dynamic scenarios quickly create time-consuming redundancies throughout a campaign. Velvet offers powerful tools for building/managing re-usable data-templates. These components can be widely repurposed, even between different campaigns. 
2. __Velvet is Ad Network agnostic.__ 
As an agency ourselves, we understand that brands already have their media deals in place. However, as a production unit, the agency has preferences for how they most easily generate these deliverables. Velvet enables the agency to generate that volume without sacrificing home-grown capabilities. 
3. __Velvet is smooth for producers.__
Once the data is modeled, and the ads are built to respond to it, producers can manage long runs of evolving content, without the need to rebuild any creative, often times without the need to re-traffic.
4. __Velvet is flexible for developers.__
Agencies on the forefront of banner development have systems in place for generating lightweight, attractive content. Velvet is compatible with your stack.

## API
<a name="api"></a>

The source code of Velvet Enabler has code documentation, that can be found by at [FF0000 Ad Tech API - Docs](https://ff0000-ad-tech.github.io/ad-docs/). Search for `Velvet`.