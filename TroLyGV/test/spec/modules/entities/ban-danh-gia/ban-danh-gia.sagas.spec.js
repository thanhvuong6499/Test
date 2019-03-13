import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getBanDanhGia, getBanDanhGias, updateBanDanhGia, deleteBanDanhGia, searchBanDanhGias } from '../../../../../app/modules/entities/ban-danh-gia/ban-danh-gia.sagas'
import BanDanhGiaActions from '../../../../../app/modules/entities/ban-danh-gia/ban-danh-gia.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getBanDanhGia(1)
  const step = stepper(getBanDanhGia(FixtureAPI, { banDanhGiaId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BanDanhGiaActions.banDanhGiaSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getBanDanhGia(FixtureAPI, { banDanhGiaId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BanDanhGiaActions.banDanhGiaFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getBanDanhGias()
  const step = stepper(getBanDanhGias(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BanDanhGiaActions.banDanhGiaAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getBanDanhGias(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BanDanhGiaActions.banDanhGiaAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateBanDanhGia({id: 1})
  const step = stepper(updateBanDanhGia(FixtureAPI, { banDanhGia: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BanDanhGiaActions.banDanhGiaUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateBanDanhGia(FixtureAPI, { banDanhGia: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BanDanhGiaActions.banDanhGiaUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchBanDanhGias()
  const step = stepper(searchBanDanhGias(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BanDanhGiaActions.banDanhGiaSearchSuccess([{id: 1}, {id: 2}])))
})

test('search failure path', () => {
  const response = {ok: false}
  const step = stepper(searchBanDanhGias(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BanDanhGiaActions.banDanhGiaSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteBanDanhGia({id: 1})
  const step = stepper(deleteBanDanhGia(FixtureAPI, { banDanhGiaId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BanDanhGiaActions.banDanhGiaDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteBanDanhGia(FixtureAPI, { banDanhGiaId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BanDanhGiaActions.banDanhGiaDeleteFailure()))
})
