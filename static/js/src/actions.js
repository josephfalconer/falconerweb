import * as ActionTypes from './actiontypes';

export function updateStoreState(payload) {
  return {
    type: ActionTypes.SIMPLE_STATE_UPDATE,
    payload
  }
}

export function addZonesData(payload) {
  return {
    type: ActionTypes.ADD_ZONES_DATA,
    zonesData: payload.map((parentZone, x) => {
      return {
        ...parentZone,
        x: x,
        y: 0,
        child_zones: parentZone.child_zones.map((childZone, y) => {
          return {
            ...childZone,
            x: x,
            y: y + 1,
          }
        })
      }
    })
  }
}
