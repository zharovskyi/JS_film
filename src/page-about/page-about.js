import { getMovieTrailer } from "../page-about/apiAbout";
import { getMovieActors } from "../page-about/apiAbout";
import { getMovieFrames } from "../page-about/apiAbout";
import { getMovieReviews } from "../page-about/apiAbout";
import { getMovie } from "../page-about/apiAbout";
import infoList from "../page-about/infoList.hbs"
import actors from "../page-about/actorsList.hbs";
import frames from "../page-about/framesList.hbs";
import reviews from "../page-about/reviewsList.hbs";

// import $ from "jquery";
// import slick from "slick-carusel";

class PageAbout {
  constructor(id) {
    this.movieId = id;
    this.api_key = "667e6c0579f71e858d539ca597385526";
    this.refs = {
      infoList: document.querySelector(".movieListInfo"),
      iframeTrailer: document.querySelector(".iframe_trailer"),
      actorsList: document.querySelector(".actors-list"),
      framesList: document.querySelector(".frames-list"),
      reviewsList: document.querySelector(".reviews-list"),
      actors: document.querySelectorAll(".actor_image"),
      frames: document.querySelectorAll(".frames_image")
    };
    this.markupInfoList();
    this.markupTrailer();
    this.markupActors();
    this.markupFrames();
    this.markupReviews();
  }

  markupInfoList() {
    getMovie(this.movieId).then(movieInfoRes => {
      const markup = infoList(movieInfoRes);
      this.refs.infoList.insertAdjacentHTML("afterbegin", markup)
    })
  }

  markupTrailer() {
    getMovieTrailer(this.movieId).then(data => {
      let trailer = data.results;
      let min = 0;
      let max = trailer.length - 1;
      min = Math.ceil(min);
      max = Math.floor(max);
      let trailerNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      const trailerKey = data.results[trailerNumber].key;
      this.refs.iframeTrailer.src =
        "http://www.youtube.com/embed/" + trailerKey;
    });
  }

  markupActors() {
    getMovieActors(this.movieId).then(data => {
      const markup = actors(data.credits.cast);
      this.refs.actorsList.insertAdjacentHTML("afterbegin", markup);

      // $(".actors-list").slick({
      //   slidesToShow: 4,
      //   slidesToScroll: 1
      // });
    });
  }

  markupFrames() {
    getMovieFrames(this.movieId).then(data => {
      const markup = frames(data.backdrops);
      this.refs.framesList.insertAdjacentHTML("afterbegin", markup);

      // $(".frames-list").slick({
      //   slidesToShow: 4,
      //   slidesToScroll: 1
      // });
    });
  }

  markupReviews() {
    getMovieReviews(this.movieId).then(data => {
      const reviewsList = [];
      data.results.map(el => {
        if (el.content.length > 300) {
          el.feedbackLength = "largeFeedback";
          el.smallText = el.content.substr(0, 300);
          el.extendedText = el.content.substr(300);
          reviewsList.push(el);
        } else {
          el.smallText = el.content;
          reviewsList.push(el);
        }
      });
      const markup = reviews(reviewsList);
      this.refs.reviewsList.insertAdjacentHTML("afterbegin", markup);
      this.showMoreReviewText();

    });
  }

  showMoreReviewText() {
    this.refs.reviewsList.addEventListener("click", e => {
      if (
        e.target.nodeName === "BUTTON" &&
        e.target.textContent === "..."
      ) {
        const hiddenSpan = e.target.previousSibling;
        hiddenSpan.classList.add("show_text");
        e.target.textContent = "collapse";
      } else if (
        e.target.nodeName === "BUTTON" &&
        e.target.textContent === "collapse"
      ) {
        const hiddenSpan = e.target.previousSibling;
        hiddenSpan.classList.remove("show_text");
        e.target.textContent = "...";
      }
    });
  }
}

const pageAbout = new PageAbout(localStorage.getItem('id'));
