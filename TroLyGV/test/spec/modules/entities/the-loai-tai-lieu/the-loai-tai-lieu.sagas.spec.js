import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getTheLoaiTaiLieu, getTheLoaiTaiLieus, updateTheLoaiTaiLieu, deleteTheLoaiTaiLieu, searchTheLoaiTaiLieus } from '../../../../../app/modules/entities/the-loai-tai-lieu/the-loai-tai-lieu.sagas'
import TheLoaiTaiLieuActions from '../../../../../app/modules/entities/the-loai-tai-lieu/the-loai-tai-lieu.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getTheLoaiTaiLieu(1)
  const step = stepper(getTheLoaiTaiLieu(FixtureAPI, { theLoaiTaiLieuId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TheLoaiTaiLieuActions.theLoaiTaiLieuSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getTheLoaiTaiLieu(FixtureAPI, { theLoaiTaiLieuId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TheLoaiTaiLieuActions.theLoaiTaiLieuFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getTheLoaiTaiLieus()
  const step = stepper(getTheLoaiTaiLieus(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TheLoaiTaiLieuActions.theLoaiTaiLieuAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getTheLoaiTaiLieus(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TheLoaiTaiLieuActions.theLoaiTaiLieuAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateTheLoaiTaiLieu({id: 1})
  const step = stepper(updateTheLoaiTaiLieu(FixtureAPI, { theLoaiTaiLieu: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TheLoaiTaiLieuActions.theLoaiTaiLieuUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateTheLoaiTaiLieu(FixtureAPI, { theLoaiTaiLieu: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TheLoaiTaiLieuActions.theLoaiTaiLieuUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchTheLoaiTaiLieus()
  const step = stepper(searchTheLoaiTaiLieus(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TheLoaiTaiLieuActions.theLoaiTaiLieuSearchSuccess([{id: 1}, {id: 2}])))
})

test('search failure path', () => {
  const response = {ok: false}
  const step = stepper(searchTheLoaiTaiLieus(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TheLoaiTaiLieuActions.theLoaiTaiLieuSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteTheLoaiTaiLieu({id: 1})
  const step = stepper(deleteTheLoaiTaiLieu(FixtureAPI, { theLoaiTaiLieuId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TheLoaiTaiLieuActions.theLoaiTaiLieuDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteTheLoaiTaiLieu(FixtureAPI, { theLoaiTaiLieuId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TheLoaiTaiLieuActions.theLoaiTaiLieuDeleteFailure()))
})
