import { useSelector, useDispatch } from "react-redux"; 

const CLIENT_REF = "useShopify/CLIENT_REF"

const initialState = {
	clientRef: {}
}

export default (state = initialState, action) => {
	switch (action.type) {
		case CLIENT_REF:
			return { ...state, ref: action.payload }
		default:
			return state
	}
}

function handleClientRef(ref) {
	console.log(ref, 'ref')
	return {
		type: CLIENT_REF,
		payload: ref
	}
}

export function useShopify() {
	const dispatch = useDispatch()
	const clientRefData = useSelector((appState) => appState.shopifyState.clientRef)
	const setClientRef = (ref) => dispatch(handleClientRef(ref))

	return {
		setClientRef,
		clientRefData,
	}
}