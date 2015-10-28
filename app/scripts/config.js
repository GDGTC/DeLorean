'use strict';
  
angular.module('devfestApp')
  .factory('Config', function() {
    return {
      /* modify these */
      
      // group/site config
      'name'          : 'GDG Twin Cities', // the name of your GDG
      'location'      : 'Minneapolis St. Paul Metro', // city location of GDG
      'email'         : 'gdgtwincities@gmail.com', // the email where you receive GDG emails
      'id'            : '116015988631052616691', // Google+ profile id for the GDG
      'googleAPI'     : 'AIzaSyB3g3Fr3M56bILSK2aqn6arqU1CQt1zb3E', // Google API Key
      'website'       : 'http://gdgtc.com', // GDG website, custom domain or [your-app].appspot.com
      'allowRegister' : true, // set to false once your "admin" login has been setup to prevent unauthorized account creations
      
      // event details
      'eventName'     : 'GDG DevFest MN', // typically 'DevFest [place]'
      'eventLocation' : 'Shultze Hall, University of St. Thomas', // location of event
      'eventAddress'  : '53 S. 11th St. Minneapolis, MN', // address of event
      'eventURL'      : 'http://devfest.mn', // link to event website (ex. G+, Meetup, Eventbrite, etc)
      'eventEmail'    : 'devfest@gdgkc.org', // Email where event inquries should go
      'speakerURL'    : 'https://goo.gl/rEypu0', // link to the 'Call for Papers' form
      'sponsorURL'    : 'https://goo.gl/n4KoLu', // link to the sponsorship form
      'ticketURL'     : 'https://goo.gl/YNDSnR', // link to buy tickets
      'eventDate'     : '2016-03-06', // ISO formatted YYYY-MM-DD (currently only supports a single day DevFest)
      'eventStart'    : '09:00:00', // start time
      'eventEnd'      : '16:00:00', // end time
      'sessionLength' : '2700000', // use minutes in milliseconds
      'sessionTracks' : '3', // number of tracks sessions are split into (ie. Mobile, Web, Cloud, etc.)
      
      // social details
      // Google+ social details are derived from the keys above
      'twitter'       : 'GDGKansasCity', // Twitter handle
      'facebook'      : 'GDGKansasCity', // Facebook handle
      'meetup'        : 'GDG-Kansas-City', // Meetup handle
      'github'        : 'GDGKansasCity', // GitHub Handle
    };
  });