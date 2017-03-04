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
        
            console.log("In initial index");
            res.render('index.ejs', {
                url: "",
                articles: "",
                message : ""
            });
        
        // load the index.ejs file

    });

    app.get('/feed', function(req, res) {
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
                        message : ""
                    });
                }else if(!result.success){
                    res.render('index.ejs', {
                        url: "",
                        articles: "",
                        message : result.message
                    });
                }
            });
        }
        // load the index.ejs file

    });
    app.post('/rssUrl', function(req, res) {
        rssUrl = req.body.rssUrl;
        if (rssUrl != null) {
            res.redirect('/feed');
        } else {
            res.redirect('/');
        }
    });


};

function getdata(req, url, callback) {
    
    console.log("In getdata");
    
    parser(url, function(err, arts) {
        if (err) {
            console.log('Err removing Milestone' + err);
            callback({
                success: false,
                message: 'Bad Url'
            });
        } else callback({
            success: true,
            articles: arts
        });
    });



}