const page = (): number =>
  parseInt(window.location.href.slice(-1), 10) - 1 || 0;

export { page };
