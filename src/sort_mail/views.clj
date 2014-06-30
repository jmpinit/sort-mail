(ns sort-mail.views
  (:use [hiccup core page]))

(defn my-include-js
  [& files]
  (let [full-paths (map #(str "/js/" %) files)]
    (apply include-js full-paths)))

(defn index-page []
  (html5
    [:head
     [:title "sort-mail"]
     (include-css "/css/style.css")
     (my-include-js "jquery-2.1.1.min.js" "webcam.js" "capture.js")]
    [:body {:onload "webcam.init();"}
     [:h1 "sort-mail"]
     [:button {:type "button" :onclick "(function() { capture.take(); capture.send(); })()"} [:h2 "sort"]]
     [:br]
     [:div {:style "width: 50%; margin-left: auto; margin-right: auto"}
      [:canvas {:style "width: 100%;" :height "128x"}]
      [:video {:onplaying "capture.init();"}]]]))
