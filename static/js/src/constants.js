// Slightly longer than the CSS animation duration used
export const PAGE_TRANSITION_TIMEOUT = 1100;

export const THEMES = {
  DARK: 'DARK',
  LIGHT: 'LIGHT'
};

export const ICONS = {
  LOGO: 'LOGO',
  TOOLS: 'TOOLS',
  PROJECTS: 'PROJECTS',
  DEMOS: 'DEMOS',
};

export const DIRECTIONS = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

export const DIRECTION_LIST = [
  DIRECTIONS.UP,
  DIRECTIONS.DOWN,
  DIRECTIONS.LEFT,
  DIRECTIONS.RIGHT
];

export const DIRECTIONS_MAPPED_TO_SWIPE = {
  [DIRECTIONS.UP]: DIRECTIONS.DOWN,
  [DIRECTIONS.DOWN]: DIRECTIONS.UP,
  [DIRECTIONS.LEFT]: DIRECTIONS.RIGHT,
  [DIRECTIONS.RIGHT]: DIRECTIONS.LEFT
};
