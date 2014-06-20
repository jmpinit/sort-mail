(ns sort-mail.views
  (:use [hiccup core page]))

(defn index-page []
  (html5
    [:head
     [:title "sort-mail"]
     (include-css "/css/style.css")
     (include-js "/js/webcam.js")]
    [:body {:onload "webcam.init()"}
     [:h1 "sort-mail"]
     [:video]]))
