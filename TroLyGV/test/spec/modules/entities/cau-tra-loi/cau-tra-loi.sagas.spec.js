import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getCauTraLoi, getCauTraLois, updateCauTraLoi, deleteCauTraLoi, searchCauTraLois } from '../../../../../app/modules/entities/cau-tra-loi/cau-tra-loi.sagas'
import CauTraLoiActions from '../../../../../app/modules/entities/cau-tra-loi/cau-tra-loi.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getCauTraLoi(1)
  const step = stepper(getCauTraLoi(FixtureAPI, { cauTraLoiId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CauTraLoiActions.cauTraLoiSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getCauTraLoi(FixtureAPI, { cauTraLoiId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CauTraLoiActions.cauTraLoiFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getCauTraLois()
  const step = stepper(getCauTraLois(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CauTraLoiActions.cauTraLoiAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getCauTraLois(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CauTraLoiActions.cauTraLoiAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateCauTraLoi({id: 1})
  const step = stepper(updateCauTraLoi(FixtureAPI, { cauTraLoi: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CauTraLoiActions.cauTraLoiUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateCauTraLoi(FixtureAPI, { cauTraLoi: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CauTraLoiActions.cauTraLoiUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchCauTraLois()
  const step = stepper(searchCauTraLois(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CauTraLoiActions.cauTraLoiSearchSuccess([{id: 1}, {id: 2}])))
})

test('search failure path', () => {
  const response = {ok: false}
  const step = stepper(searchCauTraLois(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CauTraLoiActions.cauTraLoiSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteCauTraLoi({id: 1})
  const step = stepper(deleteCauTraLoi(FixtureAPI, { cauTraLoiId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CauTraLoiActions.cauTraLoiDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteCauTraLoi(FixtureAPI, { cauTraLoiId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CauTraLoiActions.cauTraLoiDeleteFailure()))
})
