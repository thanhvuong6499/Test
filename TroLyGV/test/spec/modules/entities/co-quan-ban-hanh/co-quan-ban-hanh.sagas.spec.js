import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getCoQuanBanHanh, getCoQuanBanHanhs, updateCoQuanBanHanh, deleteCoQuanBanHanh, searchCoQuanBanHanhs } from '../../../../../app/modules/entities/co-quan-ban-hanh/co-quan-ban-hanh.sagas'
import CoQuanBanHanhActions from '../../../../../app/modules/entities/co-quan-ban-hanh/co-quan-ban-hanh.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getCoQuanBanHanh(1)
  const step = stepper(getCoQuanBanHanh(FixtureAPI, { coQuanBanHanhId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CoQuanBanHanhActions.coQuanBanHanhSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getCoQuanBanHanh(FixtureAPI, { coQuanBanHanhId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CoQuanBanHanhActions.coQuanBanHanhFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getCoQuanBanHanhs()
  const step = stepper(getCoQuanBanHanhs(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CoQuanBanHanhActions.coQuanBanHanhAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getCoQuanBanHanhs(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CoQuanBanHanhActions.coQuanBanHanhAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateCoQuanBanHanh({id: 1})
  const step = stepper(updateCoQuanBanHanh(FixtureAPI, { coQuanBanHanh: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CoQuanBanHanhActions.coQuanBanHanhUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateCoQuanBanHanh(FixtureAPI, { coQuanBanHanh: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CoQuanBanHanhActions.coQuanBanHanhUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchCoQuanBanHanhs()
  const step = stepper(searchCoQuanBanHanhs(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CoQuanBanHanhActions.coQuanBanHanhSearchSuccess([{id: 1}, {id: 2}])))
})

test('search failure path', () => {
  const response = {ok: false}
  const step = stepper(searchCoQuanBanHanhs(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CoQuanBanHanhActions.coQuanBanHanhSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteCoQuanBanHanh({id: 1})
  const step = stepper(deleteCoQuanBanHanh(FixtureAPI, { coQuanBanHanhId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CoQuanBanHanhActions.coQuanBanHanhDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteCoQuanBanHanh(FixtureAPI, { coQuanBanHanhId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CoQuanBanHanhActions.coQuanBanHanhDeleteFailure()))
})
