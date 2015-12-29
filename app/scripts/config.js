'use strict';
  
angular.module('devfestApp')
  .factory('Config', function() {
    return {
      /* modify these */
      
      // group/site config
      'name'          : 'GDG Twin Cities', // the name of your GDG
      'location'      : 'Minneapolis St. Paul Metro', // city location of GDG
      'email'         : 'gdgtwincities@gmail.com', // the email where you receive GDG emails
      'id'            : '105771089293763738926', // Google+ profile id for the GDG
      'googleAPI'     : 'AIzaSyB3g3Fr3M56bILSK2aqn6arqU1CQt1zb3E', // Google API Key
      'website'       : 'http://gdgtc.com', // GDG website, custom domain or [your-app].appspot.com
      'allowRegister' : true, // set to false once your "admin" login has been setup to prevent unauthorized account creations
      
      // event details
      'eventName'     : 'DevFestMN', // typically 'DevFest [place]'
      'eventLocation' : 'Schulze Hall, University of St. Thomas', // location of event
      'eventAddress'  : '46 S. 11th St. Minneapolis, MN', // address of event
      'eventURL'      : 'http://devfest.mn', // link to event website (ex. G+, Meetup, Eventbrite, etc)
      'eventEmail'    : 'info@devfest.mn', // Email where event inquries should go
      'speakerURL'    : 'http://goo.gl/forms/F6w1PNQNr7', // link to the 'Call for Papers' form
      'sponsorURL'    : 'https://docs.google.com/forms/d/1tL-ovRrdSCdAENnbkWSiF3OaRlkbmdzvhzNCNs_n9SU/viewform', // link to the sponsorship form
      'sponsorLevelLinkFromMainPage' : false,
      'ticketURL'     : 'http://devfestmn.eventbrite.com/?aff=devfestmnwebsite', //link to buy tickets
      'eventDate'     : '2016-02-06', // ISO formatted YYYY-MM-DD (currently only supports a single day DevFest)
      'eventStart'    : '08:00:00', // start time
      'eventEnd'      : '16:00:00', // end time
      'sessionLength' : '2700000', // use minutes in milliseconds
      'sessionTracks' : '6', // number of tracks sessions are split into (ie. Mobile, Web, Cloud, etc.)
      
      // social details
      // Google+ social details are derived from the keys above
      'twitter'       : 'gdgtc', // Twitter handle
      'facebook'      : 'gdgtwincities', // Facebook handle
      'meetup'        : 'gdg-tc', // Meetup handle
      'github'        : 'GDGTC', // GitHub Handle
    };
  });
