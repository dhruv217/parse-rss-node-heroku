var express = require('express');
var parser = require('parse-rss');
var request = require('request'); // for fetching the feed
var dateFormat = require('dateformat');
var rssUrl = null;


module.exports = function(app) {



    // =====================================

    // HOME PAGE (with login links) ========

    // =====================================

    app.get('/', function(req, res) {
        if (rssUrl != null) {
            getdata(req, rssUrl, function(result) {
                if (result.articles != null) {
                    result.articles.forEach(function(article) {
                        //var articleDate = article.published
                        console.log(article);
                        article.date = dateFormat(article.published, "ddd, mmm dS, yyyy, hh:MM:ss ")
                    });
                    console.log("In index with data");
                    res.render('index.ejs', {
                        url: rssUrl,
                        articles: result.articles,
                    });
                }
            });
        } else {
            console.log("In initial index");
            res.render('index.ejs', {
                url: "",
                articles: "",
            });
        }
        // load the index.ejs file

    });

    app.post('/rssUrl', function(req, res) {
        rssUrl = req.body.rssUrl;
        if (rssUrl != null) {
            res.redirect('/');
        } else {
            res.redirect('/');
        }
    });


};

function getdata(req, url, callback) {
    /* feed(url, function(err, arts) {
         if (err) throw err;
         // Each article has the following properties:
         //
         //   * "title"     - The article title (String).
         //   * "author"    - The author's name (String).
         //   * "link"      - The original article link (String).
         //   * "content"   - The HTML content of the article (String).
         //   * "published" - The date that the article was published (Date).
         //   * "feed"      - {name, source, link}
         arts.forEach(function(article) { 
             //var articleDate = article.published
             console.log(article);
             article.published = dateFormat(article.published, "ddd, mmm dS, yyyy, hh:MM:ss ")
         });
        });*/
    console.log("In getdata");
    /*
    var arts;
    req = request(url)
    var feedparser = new FeedParser([{
        addmeta: "false"
    }]);

    req.on('error', function(error) {
        // handle any request errors
    });

    req.on('response', function(res) {
        var stream = this; // `this` is `req`, which is a stream

        if (res.statusCode !== 200) {
            this.emit('error', new Error('Bad status code'));
        } else {
            stream.pipe(feedparser);
        }
    });

    feedparser.on('error', function(error) {
        // always handle errors
    });

    feedparser.on('readable', function() {
        // This is where the action is!
        var stream = this; // `this` is `feedparser`, which is a stream
        var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
        var item;
        
        while (item = stream.read()) {
            console.log("getting items");
            console.log(item);
            item.date = dateFormat(article.published, "ddd, mmm dS, yyyy, hh:MM:ss ");
            arts.push(item);
        } 
    });

    feedparser.on('end', function() {
            console.log(arts);
            callback({
                articles: arts
            });
    });*/
    parser(url, function(err, arts) {
        if (err) {
            console.log('Err removing Milestone' + err);
            callback({
                success: false,
                message: 'Err Removing Milestone' + err
            });
        } else callback({
            success: true,
            articles: arts
        });
    });






}