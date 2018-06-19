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

## ![Velvet Logo](https://github.com/ff0000-ad-tech/readme-assets/blob/master/ad-velvet/velvet-logo.png)

The Velvet Platform is a licensable, web-based, CMP living at https://www.velvet.tech/. It manages data which is then requested & consumed by ad units, depending on their placement / schedule / target.

### Velvet Enabler

This project includes the frontend for the Velvet CMP -- it enables creative units to load & respond dynamically to Velvet feeds.

Velvet Ads can be built according to your preference:

- NPM / ES6 / Webpack
- Vanilla Javascript
- Google Web Designer

# Getting Started

<a name="getting-started"></a>
Models for "Ad Data" are built using the Velvet Platform. For this, you will need a Velvet account. Go to https://www.velvet.tech/ for more information.

Velvet-compatible ads include `velvet-enabler.js`, either compiled, inlined, or as a script load. How you get that file depends on your packaging work-flow. We recommend NPM.

#### NPM

```sh
npm install @ff0000-ad-tech/ad-velvet --save
```

Include the distribution via:

```javascript
'./node_modules/@ff0000-ad-tech/ad-velvet/dist/velvet-enabler.js'
```

Or import with ES6:

```javascript
import { Velvet } from '@ff0000-ad-tech/ad-velvet'
```

#### GitHub

Clone or download this repo. You will find the [Javascript distributions](https://github.com/ff0000-ad-tech/ad-velvet/tree/feature/enabler/dist) at this path `ad-velvet/dist`.

Using this method, you will likely include Velvet Enabler via `<script>` tag, like

```html
<script type="text/javascript" src="js/velvet-enabler.js"></script>
```

#### Debugging

There are 2 distributions:

- `velvet-enabler.js` - completely obfuscated/minified and generates no console output.
- `velvet-enabler.debug.js` - has console output.

For sanity while developing, use the "debug" version. Velvet events are logged in the browser console.

For optimized delivery, use the production version, which is 5k smaller.

# Guides

<a name="guides"></a>

The Velvet Enabler will:

- Manage loading Velvet data
- Make the data globally available to your ad
- Provide date-management features for testing time-specific messaging

### Targeting Data

Every audience target needs a different message. Build the ad to respond dynamically, then traffic an index telling Velvet which state of data to represent.

#### Slugs

Slugs are codes used by your ad to identify different data states & request data from Velvet. They correspond to:

- Client
- Locale
- Segment
- Ad-Data

##### Client & Locale

Client & Locale slugs are always required. Segment & Ad-Data have different purposes:

###### Segment

Segments will allow you to rotate Ad Data on a schedule. To find them, in Velvet, navigate to the `SEGMENTS` tab of your campaign, select the `JSON URLs` icon to get a pop-up. In the window will be a Slugs object. Copy and paste that into your `Velvet.init({ slugs })`.

###### Ad Data

If you wish to only target a specific Ad Data for your creative, follow the same steps in the `AD DATA` tab. In the Slugs object will have `addata` rather than `segment`.

### Listening for Events

`FAIL` - if the load of the data fails

`STATIC` - if the `ad_rotation` in the segment json is set as `USE_STATIC` rather than a number

`INIT` - when the data is loaded and ready to be consumed

### Adding Date Settings

The second argument of `Velvet.init(arg1, arg2)` is the `dateSettings` object. It is optional and it does two things:

1.  Change the ad’s understanding of what “now” is. For testing, you can easily set the “now” time to the future or past to update the state of the ad.
2.  Set the date-related messaging to another language. Velvet Enabler natively supports English and Spanish. There are ways to add other languages, which can be found in the docs.

# Concepts

<a name="concepts"></a>

Programatic advertising enables Brands to reach specific demographics with a specific impression & message.

Content Management Platforms (CMP's) are the mechanism that help brand managers organize creative according to those targets. Some popular options are:

- DoubleClick Studio (Google Dynamic Content)
- Flashtalking
- Sizmek

There are many others. How is Velvet different?

1.  **Velvet has powerful tools for modeling data.**
    Dynamic scenarios quickly create time-consuming redundancies throughout a campaign. Velvet offers powerful tools for building/managing re-usable data-templates. These components can be widely repurposed, even between different campaigns.
2.  **Velvet is Ad Network agnostic.**
    As an agency ourselves, we understand that brands already have their media deals in place. However, as a production unit, the agency has preferences for how they most easily generate these deliverables. Velvet enables the agency to generate that volume without sacrificing home-grown capabilities.
3.  **Velvet is smooth for producers.**
    Once the data is modeled, and the ads are built to respond to it, producers can manage long runs of evolving content, without the need to rebuild any creative, often times without the need to re-traffic.
4.  **Velvet is flexible for developers.**
    Agencies on the forefront of banner development have systems in place for generating lightweight, attractive content. Velvet is compatible with your stack.

# API

<a name="api"></a>

The source code of Velvet Enabler has code documentation, that can be found by at [FF0000 Ad Tech API - Docs](https://ff0000-ad-tech.github.io/ad-docs/). Search for `Velvet`.
