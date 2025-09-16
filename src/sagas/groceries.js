import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import * as groceryActions from '../actions/groceries';
import groceriesApi from '../api/groceriesApi';
import HttpStatus from '../constants/httpStatusCodes';
import {addSelectedGroceryItem, updateSelectedGroceryItem} from '../actions/groceries';
import {select} from 'redux-saga-test-plan/matchers';

export const workGetGroceries = function* () {
    const groceries = yield call(groceriesApi.getGroceries);
    if (groceries.status === HttpStatus.OK) {
        return yield put(groceryActions.getGroceriesSuccess(groceries.data));
    }
    yield put(groceryActions.getGroceriesFailure());
}

export const workGetGroceryById = function* (action) {
    const grocery = yield call(groceriesApi.getGroceryById, action.payload);
    yield put(groceryActions.getGroceryByIdSuccess(grocery.data));
}

export const workAddGrocery = function* (action) {
    const { name, description = '' } = action.payload;
    const groceryToSave = { name, description };
    const savedGrocery = yield call(groceriesApi.postGrocery, groceryToSave);
    yield put(groceryActions.addGrocerySuccess(savedGrocery.data));
}

export const workSelectGroceryItem = function* (action) {
    const {
        id,
        category,
        subcategory,
        actualPrice = 0,
        estimatedPrice = 0,
        product = {},
        // TODO:. set dynamic store id next
        store = {},
        quantity,
    } = action.payload;

    const selectedGrocery = yield select(state => state.groceries.selectedGrocery);
    const groceryItem = selectedGrocery.list.find(item => item.product.id === product.id);

    const payload = {
        quantity,
        actualPrice,
        estimatedPrice,
        productId: product.id,
        // TODO:. set dynamic store id next
        storeId: 1,
    }
    if (groceryItem) {
        payload.quantity = groceryItem.quantity + 1;
        const request = {
                quantity: groceryItem.quantity + 1,
            }
        // console.log(sel)
        const savedGroceryItem = yield call(groceriesApi.putGroceryItem, groceryItem.id, request)
        yield put(updateSelectedGroceryItem(savedGroceryItem.data));
    } else {
        payload.quantity = 1;
        const savedGroceryItem = yield call(groceriesApi.postGroceryItem, selectedGrocery.id, payload)
        yield put(addSelectedGroceryItem(savedGroceryItem.data));
    }
}

function* getGroceriesWatcher() {
    yield takeEvery(groceryActions.GET_GROCERIES, workGetGroceries);
}

function* getGroceryByIdWatcher() {
    yield takeLatest(groceryActions.GET_GROCERY_BY_ID, workGetGroceryById);
}

function* addGroceryWatcher() {
    yield takeLatest(groceryActions.ADD_GROCERY, workAddGrocery);
}

function* selectGroceryItemWatcher() {
    yield takeLatest(groceryActions.SELECT_GROCERY_ITEM, workSelectGroceryItem);
}

const watchers = [
    getGroceriesWatcher(),
    getGroceryByIdWatcher(),
    addGroceryWatcher(),
    selectGroceryItemWatcher(),
]

export default watchers;