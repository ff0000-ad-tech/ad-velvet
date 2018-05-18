import * as DataManager from './lib/DataManager'
import * as Capture from './lib/Capture'
import * as EventController from './lib/EventController.js'
import * as VelvetEvents from './lib/VelvetEvents.js'
import G from './lib/get.js'

export const init = DataManager.init
export const isPreviewLocation = DataManager.isPreviewLocation
export const addEventListener = EventController.add
export const removeEventListener = EventController.remove
export const events = VelvetEvents
export const capture = Capture
export const get = G
