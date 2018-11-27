/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URLs are defined', function() {
           // use for..of to iterate over values in an iterable.
           for (let feed of allFeeds) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           };
         });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('names are defined', function() {
           for (let feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           };
         });
    });

    describe("The Menu", function() {

        /* Ensure the menu element is
         * hidden by default
         */
         it("is hidden", function() {
           expect($("body").hasClass('menu-hidden')).toBe(true); //as suggested
         });

         /* Ensure the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it("toggles visibility when menu icon is clicked", function() {
            document.querySelector(".menu-icon-link").click();
            expect($("body").hasClass('menu-hidden')).toBe(false); //as suggested
            document.querySelector(".menu-icon-link").click();
            expect($("body").hasClass('menu-hidden')).toBe(true); //as suggested
          });
    });

    describe("Initial Entries", function() {
        beforeEach(function(done) {
          loadFeed(0, done);
        });

        /* Ensure when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         it("contains at least one entry element in feed container", function() {
           const myFeed = document.querySelector(".feed");
           expect(myFeed.getElementsByClassName("entry").length>0).toBe(true);
         });
    });

    describe("New Feed Selection", function() {
      let feed0,feed1 = ['',''];

      // before each test, load two different feeds' innerText into variables
      // so we can compare later
      beforeEach(function(done) {
        loadFeed(0, function() {
          // Storing innerText ensures that the initial content is stored in the
          // variable, not the selector
          feed0 = document.querySelector(".feed").innerText;

          // call for a new feed after the loadFeed 0 to ensure the new feed
          // is loaded after the old feed finishes
          loadFeed(1, function() {
            feed1 = document.querySelector(".feed").innerText;
            done();
          });
        });
      });

        /* Ensure when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it("content actually changes", function() {
          // expect(document.querySelector(".feed").innerText===content).toBe(false);
          expect(feed0 === feed1).toBe(false);
        });
    });
}());
