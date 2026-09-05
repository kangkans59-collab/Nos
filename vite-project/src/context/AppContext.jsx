import { createContext, useContext, useMemo, useReducer, useCallback } from 'react'
import { initialProduce } from '../data/mockProduce.js'
import { initialReservations } from '../data/mockReservations.js'
import { initialTransactions } from '../data/mockTransactions.js'
import { initialPickupPlans } from '../data/mockPickupPlans.js'
import { CURRENT_SELLER, CURRENT_BUYER } from '../data/constants.js'

const AppContext = createContext(null)

const initialState = {
  role: null,
  produce: initialProduce,
  reservations: initialReservations,
  transactions: initialTransactions,
  pickupPlans: initialPickupPlans,
}

// Simple incrementing counters so mock IDs look realistic across a session.
let reservationCounter = 3500
let planCounter = 15

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.role }

    case 'ADD_PRODUCE': {
      const newListing = {
        id: `prod-${Date.now()}`,
        seller: CURRENT_SELLER,
        location: CURRENT_SELLER.location,
        distanceKm: 0,
        quantityAvailable: action.payload.quantityTotal,
        quantityReserved: 0,
        status: 'active',
        ...action.payload,
      }
      return { ...state, produce: [newListing, ...state.produce] }
    }

    // The core "no backend" simulation: reserving stock is validated and
    // applied entirely in React state. Over-reservation is impossible —
    // the quantity is always clamped to whatever is currently available.
    case 'RESERVE_PRODUCE': {
      const { produceId, quantity } = action.payload
      let createdReservation = null

      const produce = state.produce.map((item) => {
        if (item.id !== produceId) return item

        const safeQuantity = Math.max(0, Math.min(quantity, item.quantityAvailable))
        const quantityAvailable = item.quantityAvailable - safeQuantity

        createdReservation = {
          id: `RSV-${reservationCounter++}`,
          produceId: item.id,
          produceName: item.name,
          buyerName: CURRENT_BUYER.name,
          sellerName: item.seller.name,
          quantity: safeQuantity,
          unit: item.unit,
          zone: item.location,
          pickupWindow: 'Awaiting pickup plan',
          status: 'ready-for-pickup',
          createdAt: new Date().toISOString(),
        }

        return {
          ...item,
          quantityAvailable,
          quantityReserved: item.quantityReserved + safeQuantity,
          status: quantityAvailable <= 0 ? 'sold-out' : item.status,
        }
      })

      return {
        ...state,
        produce,
        reservations: createdReservation ? [createdReservation, ...state.reservations] : state.reservations,
      }
    }

    case 'CREATE_PICKUP_PLAN': {
      const { reservationIds, location, window, notes } = action.payload
      const involved = state.reservations.filter((r) => reservationIds.includes(r.id))
      const totalQuantity = involved.reduce((sum, r) => sum + r.quantity, 0)

      const newPlan = {
        id: `PLAN-${String(planCounter++).padStart(3, '0')}`,
        zone: location,
        status: 'Scheduled',
        reservationCount: involved.length,
        totalQuantity,
        window,
        notes,
      }

      const reservations = state.reservations.map((r) =>
        reservationIds.includes(r.id) ? { ...r, status: 'grouped', pickupWindow: window } : r
      )

      return {
        ...state,
        pickupPlans: [newPlan, ...state.pickupPlans],
        reservations,
      }
    }

    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setRole = useCallback((role) => dispatch({ type: 'SET_ROLE', role }), [])

  const addProduce = useCallback((payload) => dispatch({ type: 'ADD_PRODUCE', payload }), [])

  const reserveProduce = useCallback(
    (produceId, quantity) => dispatch({ type: 'RESERVE_PRODUCE', payload: { produceId, quantity } }),
    []
  )

  const createPickupPlan = useCallback(
    (payload) => dispatch({ type: 'CREATE_PICKUP_PLAN', payload }),
    []
  )

  const value = useMemo(
    () => ({ ...state, setRole, addProduce, reserveProduce, createPickupPlan }),
    [state, setRole, addProduce, reserveProduce, createPickupPlan]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within an AppProvider')
  return ctx
}
