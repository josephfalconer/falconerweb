export function isSideways(currentPage, previousPage) {
  return previousPage.y == currentPage.y && Math.abs(previousPage.x - currentPage.x) == 1;
}

export function isVertical(currentPage, previousPage) {
  return previousPage.x == currentPage.x && Math.abs(previousPage.y - currentPage.y) == 1;
}

export function isLeftwards(currentPage, previousPage) {
  return currentPage.x < previousPage.x;
}

export function isUpwards(currentPage, previousPage) {
  return currentPage.y < previousPage.y;
}

// From underscore.js
export function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
};

export function canScrollElement(element, direction) {
  if (direction === 'up' && element.scrollTop > 0) {
    return true;
  } else if (direction === 'down') {
    const maxScrollDownPosition = element.scrollHeight - element.offsetHeight;
    if (maxScrollDownPosition - element.scrollTop > 0) {
      return true;
    }
  }
  return false;
}
