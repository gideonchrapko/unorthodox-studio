import { useSelector, useDispatch } from "react-redux"; 
import sanityClient from '../../../client';

const PROJECT_CATEGORY = "shopify/PROJECT_CATEGORY"
const CLIENTS_CATEGORY = "shopify/CLIENTS_CATEGORY"
const PROJECT_INDEX = "shopify/PROJECT_INDEX"
const FETCH_VISUAL = "shopify/FETCH_VISUAL"
const FETCH_SOUND = "shopify/FETCH_SOUND"
const FETCH_FASHION = "shopify/FETCH_FASHION"
const FETCH_UX = "shopify/FETCH_UX"
const HAMBURGER_OPEN = "shopify/OPEN_CART"
const HAMBURGER_CLOSE = "shopify/CLOSE_CART"

const initialState = {
	visual: {},
	sound: {},
	fashion: {},
	ux: {},
	isHamburgerOpen: false,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case PROJECT_CATEGORY:
			return { ...state, Cat: action.payload }
		case CLIENTS_CATEGORY:
			return { ...state, clientCat: action.payload }
		case PROJECT_INDEX:
			return { ...state, index: action.payload }
		case FETCH_VISUAL:
			return { ...state, visual: action.payload }
		case FETCH_SOUND:
			return { ...state, sound: action.payload }
		case FETCH_FASHION:
			return { ...state, fashion: action.payload }
		case FETCH_UX:
			return { ...state, ux: action.payload }
		case HAMBURGER_OPEN:
			return { ...state, isHamburgerOpen: true }
		case HAMBURGER_CLOSE:
			return { ...state, isHamburgerOpen: false }
		default:
			return state
	}
}

function getVisual() {
	console.log("get visual")
	return (dispatch) => {
		sanityClient.fetch(`*[_type == "visualProject"]{ slugRoute, projectImages, projectTitle, clients }`).then((data) => {
			dispatch({
				type: FETCH_VISUAL,
				payload: data,
			})
		})
	}
}

function getSound() {
	return (dispatch) => {
		sanityClient.fetch(`*[_type == "soundProject"]{ slugRoute, projectImages, projectTitle, clients }`).then((data) => {
			dispatch({
				type: FETCH_SOUND,
				payload: data,
			})
		})
	}
}

function getFashion() {
	return (dispatch) => {
		sanityClient.fetch(`*[_type == "fashionProject"]{ slugRoute, projectImages, projectTitle, clients }`).then((data) => {
			dispatch({
				type: FETCH_FASHION,
				payload: data,
			})
		})
	}
}

function getUX() {
	return (dispatch) => {
		sanityClient.fetch(`*[_type == "uxProject"]{ slugRoute, projectImages, projectTitle, clients }`).then((data) => {
			dispatch({
				type: FETCH_UX,
				payload: data,
			})
		})
	}
}

function handleProjectCat(Cat) {
	return {
		type: PROJECT_CATEGORY,
		payload: Cat
	}
}

function handleClientCat(clientCat) {
	return {
		type: CLIENTS_CATEGORY,
		payload: clientCat
	}
}

function handleProjectIndex(index) {
	return {
		type: PROJECT_INDEX,
		payload: index
	}
}

function handleHamburgerClose() {
	return {
		type: HAMBURGER_CLOSE,
	}
}

// To open the cart
function handleHamburgerOpen() {
	return {
		type: HAMBURGER_OPEN,
	}
}

export function useShopify() {
	const dispatch = useDispatch()
	const projectIndex = useSelector((appState) => appState.shopifyState.index)
	const projectCat = useSelector((appState) => appState.shopifyState.Cat)
	const clientCategory = useSelector((appState) => appState.shopifyState.clientCat)
	const visualData = useSelector((appState) => appState.shopifyState.visual)
	const soundData = useSelector((appState) => appState.shopifyState.sound)
	const fashionData = useSelector((appState) => appState.shopifyState.fashion)
	const hamburgerStatus = useSelector((appState) => appState.shopifyState.isHamburgerOpen)
	const uxData = useSelector((appState) => appState.shopifyState.ux)
	const setProjectCategory = (Cat) => dispatch(handleProjectCat(Cat))
	const setClientCategory = (clientCat) => dispatch(handleClientCat(clientCat))
	const setProjectIndex = (index) => dispatch(handleProjectIndex(index))
	const setVisualData = (visual) => dispatch(getVisual(visual))
	const setSoundData = (sound) => dispatch(getSound(sound))
	const setFashionData = (fashion) => dispatch(getFashion(fashion))
	const setUXData = (ux) => dispatch(getUX(ux))
	const closeHamburger = () => dispatch(handleHamburgerClose())
	const openHamburger = () => dispatch(handleHamburgerOpen())

	return {
		visualData,
		soundData,
		fashionData,
		uxData,
		projectIndex,
		projectCat,
		clientCategory,
		hamburgerStatus,
		setProjectCategory,
		setClientCategory,
		setProjectIndex,
		setVisualData,
		setSoundData,
		setFashionData,
		setUXData,
		closeHamburger,
		openHamburger,
	}
}