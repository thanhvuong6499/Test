import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getTaiLieu, getTaiLieus, updateTaiLieu, deleteTaiLieu, searchTaiLieus } from '../../../../../app/modules/entities/tai-lieu/tai-lieu.sagas'
import TaiLieuActions from '../../../../../app/modules/entities/tai-lieu/tai-lieu.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getTaiLieu(1)
  const step = stepper(getTaiLieu(FixtureAPI, { taiLieuId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TaiLieuActions.taiLieuSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getTaiLieu(FixtureAPI, { taiLieuId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TaiLieuActions.taiLieuFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getTaiLieus()
  const step = stepper(getTaiLieus(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TaiLieuActions.taiLieuAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getTaiLieus(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TaiLieuActions.taiLieuAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateTaiLieu({id: 1})
  const step = stepper(updateTaiLieu(FixtureAPI, { taiLieu: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TaiLieuActions.taiLieuUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateTaiLieu(FixtureAPI, { taiLieu: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TaiLieuActions.taiLieuUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchTaiLieus()
  const step = stepper(searchTaiLieus(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TaiLieuActions.taiLieuSearchSuccess([{id: 1}, {id: 2}])))
})

test('search failure path', () => {
  const response = {ok: false}
  const step = stepper(searchTaiLieus(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TaiLieuActions.taiLieuSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteTaiLieu({id: 1})
  const step = stepper(deleteTaiLieu(FixtureAPI, { taiLieuId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TaiLieuActions.taiLieuDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteTaiLieu(FixtureAPI, { taiLieuId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TaiLieuActions.taiLieuDeleteFailure()))
})
