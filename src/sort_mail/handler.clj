(ns sort-mail.handler
  (:import [java.awt.image BufferedImage])
  (:use compojure.core
        [clojure.java.shell :only (sh)]
        sort-mail.views
        [hiccup.middleware :only (wrap-base-url)])
  (:require [compojure.route :as route]
            [compojure.handler :as handler]
            [compojure.response :as response]
            [clojure.data.codec.base64 :as b64]))

(def MAX_WIDTH 2048)
(def MAX_HEIGHT 2048)

(defn zip
  [col1 col2]
  (map #(vector %1 %2) col1 col2))

(defn bmask
  [n]
  (bit-and n 0xFF))

(defn divisible?
  [n d]
  (= (mod n d) 0))

(defn binary-to-image
  [binary]
  (let [[widthH widthL heightH heightL _] binary
        width (bit-or (bit-shift-left (bmask widthH) 8) (bmask widthL))
        height (bit-or (bit-shift-left (bmask heightH) 8) (bmask heightL))
        pixels (drop 4 (map bmask binary))
        pixels-rgb (partition 3 pixels)
        p-i (range (count pixels-rgb))
        pixels-indexed (map #(vector %1 %2) pixels-rgb p-i)]
    (do ; draw
      (assert (divisible? (count pixels) 3))
      (assert (and (> width 0) (> height 0)))
      (assert (and (< width MAX_WIDTH) (< height MAX_HEIGHT)))
      (assert (= (count (filter #(not= (count %) 3) pixels-rgb)) 0))

      (def image (BufferedImage. width height (BufferedImage/TYPE_INT_RGB)))

      (doall (map (fn [[[r g b] i]]
             (let [x (mod i width)
                   y (int (/ i width))
                   rgb (bit-and (bit-or (bit-shift-left (bmask r) 16)
                                        (bit-shift-left (bmask g) 8)
                                        (bmask b)) 0xFFFFFF)]
               (.setRGB image x y rgb))) pixels-indexed))
      (println "binary-to-image done")
      image)))

(defn save-image
  [image filename]
  (let [file (java.io.File. filename)]
    (javax.imageio.ImageIO/write image "png" file)))

(defroutes main-routes
  (GET "/" [] (index-page))
  (POST "/ocr" request
            (let [image-base64 (:image (:params request))
                  image-binary (b64/decode (.getBytes image-base64))
                  image (binary-to-image image-binary)]
              (do (save-image image "resources/public/label.png")
                  (sh "tesseract" "resources/public/label.png" "resources/public/ocr")
                  (:out (sh "cat" "resources/public/ocr.txt")))))
  (route/resources "/")
  (route/not-found "Page not found"))

(def app
  (-> (handler/site main-routes)
      (wrap-base-url)))
