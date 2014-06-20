(ns sort-mail.views
  (:use [hiccup core page]))

(defn index-page []
  (html5
    [:head
     [:title "sort-mail"]
     (include-css "/css/style.css")
     (include-js "/js/webcam.js" "/js/capture.js")]
    [:body {:onload "webcam.init();"}
     [:h1 "sort-mail"]
     [:button {:type "button" :onclick "capture.take();"} [:h2 "sort"]]
     [:br]
     [:canvas {:style "width: 100%;" :height "128x"}]
     [:video {:onplaying "capture.init();"}]]))
