# 🏈 NFL Data Dashboard App

<img src='./app-visual.png'/>


### This web app:

Dynamically displays up to date NFL game information from the past 7 days (week) in the form of a dashboard with team name and conference dynamic filtering. Includes summary statistics for the finished games and chart visualizations. Additonally, a new detail view was developed to view more details about each game and players and allow for more navigation through the site!

*Note: This is an expansion of an app created whilst in CodePath's WEB 102 course*

### Work In Progress:
Integrating FastAPI backend and setting up database for optimized data retrieval

### Future Work:
Integrating GenAI RAG 'Sports Assistant' Chatbot (LLM) with interactive web page

## Required Features

The following **required** functionality is completed:

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking on an item in the dashboard list navigates to a detail view for that item
  - Detail view includes extra information about the item not included in the dashboard view
  - The same sidebar is displayed in detail view as in dashboard view
  - *To ensure an accurate grade, your sidebar **must** be viewable when showing the details view in your recording.*
- [x] **Each detail view of an item has a direct, unique URL link to that item’s detail view page**
  -  *To ensure an accurate grade, the URL/address bar of your web browser **must** be viewable in your recording.*
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - At least two charts should be incorporated into the dashboard view of the site
  - Each chart should describe a different aspect of the dataset


The following **optional** features are implemented:

- [ ] The site’s customized dashboard contains more content that explains what is interesting about the data 
  - e.g., an additional description, graph annotation, suggestion for which filters to use, or an additional page that explains more about the data
- [ ] The site allows users to toggle between different data visualizations
  - User should be able to use some mechanism to toggle between displaying and hiding visualizations 

  
The following **additional** features are implemented:

* [x] List anything else that you added to improve the site's functionality!
      In detail view, retrieved NBA player data for each of the two teams displayed for current game through additional API call. Also retrieved NBA logos for each team through online package

## Video Walkthrough

Here's a walkthrough of implemented web app:

<img src='nbadash/DemoGIF.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ScreenToGif
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Describe any challenges encountered while building the app.

Starting off and filtering out my data to make it suitable for the charts was difficult and took longer than anticipated.

## License

    Copyright [2025] [Aadi Bery]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
