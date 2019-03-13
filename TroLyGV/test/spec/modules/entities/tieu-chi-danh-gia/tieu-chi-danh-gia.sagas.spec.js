import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getTieuChiDanhGia, getTieuChiDanhGias, updateTieuChiDanhGia, deleteTieuChiDanhGia, searchTieuChiDanhGias } from '../../../../../app/modules/entities/tieu-chi-danh-gia/tieu-chi-danh-gia.sagas'
import TieuChiDanhGiaActions from '../../../../../app/modules/entities/tieu-chi-danh-gia/tieu-chi-danh-gia.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getTieuChiDanhGia(1)
  const step = stepper(getTieuChiDanhGia(FixtureAPI, { tieuChiDanhGiaId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TieuChiDanhGiaActions.tieuChiDanhGiaSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getTieuChiDanhGia(FixtureAPI, { tieuChiDanhGiaId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TieuChiDanhGiaActions.tieuChiDanhGiaFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getTieuChiDanhGias()
  const step = stepper(getTieuChiDanhGias(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TieuChiDanhGiaActions.tieuChiDanhGiaAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getTieuChiDanhGias(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TieuChiDanhGiaActions.tieuChiDanhGiaAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateTieuChiDanhGia({id: 1})
  const step = stepper(updateTieuChiDanhGia(FixtureAPI, { tieuChiDanhGia: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TieuChiDanhGiaActions.tieuChiDanhGiaUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateTieuChiDanhGia(FixtureAPI, { tieuChiDanhGia: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TieuChiDanhGiaActions.tieuChiDanhGiaUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchTieuChiDanhGias()
  const step = stepper(searchTieuChiDanhGias(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TieuChiDanhGiaActions.tieuChiDanhGiaSearchSuccess([{id: 1}, {id: 2}])))
})

test('search failure path', () => {
  const response = {ok: false}
  const step = stepper(searchTieuChiDanhGias(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TieuChiDanhGiaActions.tieuChiDanhGiaSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteTieuChiDanhGia({id: 1})
  const step = stepper(deleteTieuChiDanhGia(FixtureAPI, { tieuChiDanhGiaId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TieuChiDanhGiaActions.tieuChiDanhGiaDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteTieuChiDanhGia(FixtureAPI, { tieuChiDanhGiaId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TieuChiDanhGiaActions.tieuChiDanhGiaDeleteFailure()))
})
