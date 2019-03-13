import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getTheLoaiTieuChi, getTheLoaiTieuChis, updateTheLoaiTieuChi, deleteTheLoaiTieuChi, searchTheLoaiTieuChis } from '../../../../../app/modules/entities/the-loai-tieu-chi/the-loai-tieu-chi.sagas'
import TheLoaiTieuChiActions from '../../../../../app/modules/entities/the-loai-tieu-chi/the-loai-tieu-chi.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getTheLoaiTieuChi(1)
  const step = stepper(getTheLoaiTieuChi(FixtureAPI, { theLoaiTieuChiId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TheLoaiTieuChiActions.theLoaiTieuChiSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getTheLoaiTieuChi(FixtureAPI, { theLoaiTieuChiId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TheLoaiTieuChiActions.theLoaiTieuChiFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getTheLoaiTieuChis()
  const step = stepper(getTheLoaiTieuChis(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TheLoaiTieuChiActions.theLoaiTieuChiAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getTheLoaiTieuChis(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TheLoaiTieuChiActions.theLoaiTieuChiAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateTheLoaiTieuChi({id: 1})
  const step = stepper(updateTheLoaiTieuChi(FixtureAPI, { theLoaiTieuChi: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TheLoaiTieuChiActions.theLoaiTieuChiUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateTheLoaiTieuChi(FixtureAPI, { theLoaiTieuChi: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TheLoaiTieuChiActions.theLoaiTieuChiUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchTheLoaiTieuChis()
  const step = stepper(searchTheLoaiTieuChis(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TheLoaiTieuChiActions.theLoaiTieuChiSearchSuccess([{id: 1}, {id: 2}])))
})

test('search failure path', () => {
  const response = {ok: false}
  const step = stepper(searchTheLoaiTieuChis(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TheLoaiTieuChiActions.theLoaiTieuChiSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteTheLoaiTieuChi({id: 1})
  const step = stepper(deleteTheLoaiTieuChi(FixtureAPI, { theLoaiTieuChiId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TheLoaiTieuChiActions.theLoaiTieuChiDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteTheLoaiTieuChi(FixtureAPI, { theLoaiTieuChiId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TheLoaiTieuChiActions.theLoaiTieuChiDeleteFailure()))
})
