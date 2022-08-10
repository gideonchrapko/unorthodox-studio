import { useSelector, useDispatch } from "react-redux"; 

const LIGHT_MODE = "shopify/LIGHT_MODE"
const DARK_MODE = "shopify/DARK_MODE"
const DRAG_NODE = "shopify/DRAG_NODE"
const SOUND_ON = "shopify/SOUND_ON"
const SOUND_OFF = "shopify/SOUND_OFF"
const MODAL_OPEN = "shopify/MODAL_OPEN"
const MODAL_CLOSE = "shopify/MODAL_CLOSE"
const MODAL_IMG = "shopify/MODAL_IMG"
const USD_ON = "useShopify/USD_ON"
const USD_OFF = "useShopify/USD_OFF"

const initialState = {
	modalImg: {},
	usd: true,
	modal: false,
	sound: true,
	darkMode: true,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case LIGHT_MODE:
			return { ...state, darkMode: false }
		case DARK_MODE:
			return { ...state, darkMode: true }
		case SOUND_ON:
			return { ...state, sound: true }
		case SOUND_OFF:
			return { ...state, sound: false }
		case MODAL_OPEN:
			return { ...state, modal: true }
		case MODAL_CLOSE:
			return { ...state, modal: false }
		case MODAL_IMG:
			return { ...state, Img: action.payload }
		case USD_ON:
			return { ...state, usd: true }
		case USD_OFF:
			return { ...state, usd: false }
		case DRAG_NODE:
			return { ...state, drag: action.payload }
		default:
			return state
	}
}

function handleDragNode(drag) {
	return {
		type: DRAG_NODE,
		payload: drag
	}
}

// To close the cart
function handleLightMode() {
	return {
		type: LIGHT_MODE,
	}
}

// To open the cart
function handleDarkMode() {
	return {
		type: DARK_MODE,
	}
}

function handleSoundOn() {
	return {
		type: SOUND_ON,
	}
}

function handleSoundOff() {
	return {
		type: SOUND_OFF,
	}
}

function handleModalOpen() {
	return {
		type: MODAL_OPEN,
	}
}

function handleModalClose() {
	return {
		type: MODAL_CLOSE,
	}
}

function handleModalImg(Img) {
	return {
		type: MODAL_IMG,
		payload: Img
	}
}

function handleUsdOn() {
	return {
		type: USD_ON,
	}
}

function handleUsdOff() {
	return {
		type: USD_OFF,
	}
}

export function useShopify() {
	const dispatch = useDispatch()
	const darkModeStatus = useSelector((appState) => appState.shopifyState.darkMode)
	const soundStatus = useSelector((appState) => appState.shopifyState.sound)
	const modalImg = useSelector((appState) => appState.shopifyState.Img)
	const dragStatus = useSelector((appState) => appState.shopifyState.drag) //this needs to go
	const modalStatus = useSelector((appState) => appState.shopifyState.modal)
	const usdStatus = useSelector((appState) => appState.shopifyState.usd)
	const lightMode = () => dispatch(handleLightMode())
	const darkMode = () => dispatch(handleDarkMode())
	const openModal = () => dispatch(handleModalOpen())
	const closeModal = () => dispatch(handleModalClose())
	const setModalImg = (Img) => dispatch(handleModalImg(Img))
	const soundOn = () => dispatch(handleSoundOn())
	const soundOff = () => dispatch(handleSoundOff())
	const usdOn = () => dispatch(handleUsdOn())
	const usdOff = () => dispatch(handleUsdOff())
	const setDrag = (drag) => dispatch(handleDragNode(drag))

	return {
		modalStatus,
		soundStatus,
		darkModeStatus,
		modalImg,
		usdStatus,
		dragStatus,
		lightMode,
		darkMode,
		soundOn,
		soundOff,
		openModal,
		closeModal,
		setModalImg,
		usdOn,
		usdOff,
		setDrag,
	}
}