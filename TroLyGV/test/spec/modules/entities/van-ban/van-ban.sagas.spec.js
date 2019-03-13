import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getVanBan, getVanBans, updateVanBan, deleteVanBan, searchVanBans } from '../../../../../app/modules/entities/van-ban/van-ban.sagas'
import VanBanActions from '../../../../../app/modules/entities/van-ban/van-ban.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getVanBan(1)
  const step = stepper(getVanBan(FixtureAPI, { vanBanId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VanBanActions.vanBanSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getVanBan(FixtureAPI, { vanBanId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VanBanActions.vanBanFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getVanBans()
  const step = stepper(getVanBans(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VanBanActions.vanBanAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getVanBans(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VanBanActions.vanBanAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateVanBan({id: 1})
  const step = stepper(updateVanBan(FixtureAPI, { vanBan: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VanBanActions.vanBanUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateVanBan(FixtureAPI, { vanBan: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VanBanActions.vanBanUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchVanBans()
  const step = stepper(searchVanBans(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VanBanActions.vanBanSearchSuccess([{id: 1}, {id: 2}])))
})

test('search failure path', () => {
  const response = {ok: false}
  const step = stepper(searchVanBans(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VanBanActions.vanBanSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteVanBan({id: 1})
  const step = stepper(deleteVanBan(FixtureAPI, { vanBanId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VanBanActions.vanBanDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteVanBan(FixtureAPI, { vanBanId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VanBanActions.vanBanDeleteFailure()))
})
