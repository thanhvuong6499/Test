import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getGiaoVien, getGiaoViens, updateGiaoVien, deleteGiaoVien, searchGiaoViens } from '../../../../../app/modules/entities/giao-vien/giao-vien.sagas'
import GiaoVienActions from '../../../../../app/modules/entities/giao-vien/giao-vien.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getGiaoVien(1)
  const step = stepper(getGiaoVien(FixtureAPI, { giaoVienId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(GiaoVienActions.giaoVienSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getGiaoVien(FixtureAPI, { giaoVienId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(GiaoVienActions.giaoVienFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getGiaoViens()
  const step = stepper(getGiaoViens(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(GiaoVienActions.giaoVienAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getGiaoViens(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(GiaoVienActions.giaoVienAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateGiaoVien({id: 1})
  const step = stepper(updateGiaoVien(FixtureAPI, { giaoVien: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(GiaoVienActions.giaoVienUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateGiaoVien(FixtureAPI, { giaoVien: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(GiaoVienActions.giaoVienUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchGiaoViens()
  const step = stepper(searchGiaoViens(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(GiaoVienActions.giaoVienSearchSuccess([{id: 1}, {id: 2}])))
})

test('search failure path', () => {
  const response = {ok: false}
  const step = stepper(searchGiaoViens(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(GiaoVienActions.giaoVienSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteGiaoVien({id: 1})
  const step = stepper(deleteGiaoVien(FixtureAPI, { giaoVienId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(GiaoVienActions.giaoVienDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteGiaoVien(FixtureAPI, { giaoVienId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(GiaoVienActions.giaoVienDeleteFailure()))
})
