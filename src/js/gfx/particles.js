import 'particles.js';

export default function() {
  particlesJS("particles", {
    "particles": {
      "number": {
        "value": 135,
        "density": {
          "enable": true,
          "value_area": 1000
        }
      },
      "color": {
        "value": ['#69b7eb', '#b3dbd3', '#f4d6db', '#cfecd0', '#ffc5ca', '#f598a8', '#aea4e3']
      },

      "shape": {
        "type": "polygon",
        "polygon": {
          "nb_sides": 7
        }
      },
      "opacity": {
        "value": 0.9,
        "random": false,
        "anim": {
          "enable": true,
          "speed": 1,
          "opacity_min": 0.25,
          "sync": false
        }
      },
      "size": {
        "value": 2.5,
        "random": true,
        "anim": {
          "enable": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 120,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 10 / 4.5,
        "random": true,
        "direction": "top-right",
        "straight": false,
        "out_bounce": "bounce",
        "bounce": true
      }
    },
    "interactivity": {
      "detect_on": "window",
      "events": {
        "onhover": {
          "enable": true,
          "mode": ["grab", "repulse"]
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 175,
          "line_linked": {
            "opacity": 1
          }
        },
        "repulse": {
          "distance": 150,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 8
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
};