import 'mathjax';

export default function() {
  MathJax.Hub.Config(
  {
    tex2jax: {
      inlineMath: [['$','$'], ['\\(','\\)']],
      displayMath: [['\\[','\\]'], ['$$','$$']]
    },
    messageStyle: 'none'
  });
}