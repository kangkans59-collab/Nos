// import { createContext, useContext, useMemo, useReducer, useCallback } from 'react'
// import { initialProduce } from '../data/mockProduce.js'
// import { initialReservations } from '../data/mockReservations.js'
// import { initialTransactions } from '../data/mockTransactions.js'
// import { initialPickupPlans } from '../data/mockPickupPlans.js'
// import { CURRENT_SELLER, CURRENT_BUYER } from '../data/constants.js'

// const AppContext = createContext(null)

// const initialState = {
//   role: null,
//   produce: initialProduce,
//   reservations: initialReservations,
//   transactions: initialTransactions,
//   pickupPlans: initialPickupPlans,
// }

// // Simple incrementing counters so mock IDs look realistic across a session.
// let reservationCounter = 3500
// let planCounter = 15

// function reducer(state, action) {
//   switch (action.type) {
//     case 'SET_ROLE':
//       return { ...state, role: action.role }

//     case 'ADD_PRODUCE': {
//       const newListing = {
//         id: `prod-${Date.now()}`,
//         seller: CURRENT_SELLER,
//         location: CURRENT_SELLER.location,
//         distanceKm: 0,
//         quantityAvailable: action.payload.quantityTotal,
//         quantityReserved: 0,
//         status: 'active',
//         ...action.payload,
//       }
//       return { ...state, produce: [newListing, ...state.produce] }
//     }

//     // The core "no backend" simulation: reserving stock is validated and
//     // applied entirely in React state. Over-reservation is impossible —
//     // the quantity is always clamped to whatever is currently available.
//     case 'RESERVE_PRODUCE': {
//       const { produceId, quantity } = action.payload
//       let createdReservation = null

//       const produce = state.produce.map((item) => {
//         if (item.id !== produceId) return item

//         const safeQuantity = Math.max(0, Math.min(quantity, item.quantityAvailable))
//         const quantityAvailable = item.quantityAvailable - safeQuantity

//         createdReservation = {
//           id: `RSV-${reservationCounter++}`,
//           produceId: item.id,
//           produceName: item.name,
//           buyerName: CURRENT_BUYER.name,
//           sellerName: item.seller.name,
//           quantity: safeQuantity,
//           unit: item.unit,
//           zone: item.location,
//           pickupWindow: 'Awaiting pickup plan',
//           status: 'ready-for-pickup',
//           createdAt: new Date().toISOString(),
//         }

//         return {
//           ...item,
//           quantityAvailable,
//           quantityReserved: item.quantityReserved + safeQuantity,
//           status: quantityAvailable <= 0 ? 'sold-out' : item.status,
//         }
//       })

//       return {
//         ...state,
//         produce,
//         reservations: createdReservation ? [createdReservation, ...state.reservations] : state.reservations,
//       }
//     }

//     case 'CREATE_PICKUP_PLAN': {
//       const { reservationIds, location, window, notes } = action.payload
//       const involved = state.reservations.filter((r) => reservationIds.includes(r.id))
//       const totalQuantity = involved.reduce((sum, r) => sum + r.quantity, 0)

//       const newPlan = {
//         id: `PLAN-${String(planCounter++).padStart(3, '0')}`,
//         zone: location,
//         status: 'Scheduled',
//         reservationCount: involved.length,
//         totalQuantity,
//         window,
//         notes,
//       }

//       const reservations = state.reservations.map((r) =>
//         reservationIds.includes(r.id) ? { ...r, status: 'grouped', pickupWindow: window } : r
//       )

//       return {
//         ...state,
//         pickupPlans: [newPlan, ...state.pickupPlans],
//         reservations,
//       }
//     }

//     default:
//       return state
//   }
// }

// export function AppProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, initialState)

//   const setRole = useCallback((role) => dispatch({ type: 'SET_ROLE', role }), [])

//   const addProduce = useCallback((payload) => dispatch({ type: 'ADD_PRODUCE', payload }), [])

//   const reserveProduce = useCallback(
//     (produceId, quantity) => dispatch({ type: 'RESERVE_PRODUCE', payload: { produceId, quantity } }),
//     []
//   )

//   const createPickupPlan = useCallback(
//     (payload) => dispatch({ type: 'CREATE_PICKUP_PLAN', payload }),
//     []
//   )

//   const value = useMemo(
//     () => ({ ...state, setRole, addProduce, reserveProduce, createPickupPlan }),
//     [state, setRole, addProduce, reserveProduce, createPickupPlan]
//   )

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>
// }

// export function useApp() {
//   const ctx = useContext(AppContext)
//   if (!ctx) throw new Error('useApp must be used within an AppProvider')
//   return ctx
// }

import { createContext, useContext, useMemo, useReducer, useCallback, useEffect } from 'react'
import { CURRENT_SELLER, CURRENT_BUYER } from '../data/constants.js'

const AppContext = createContext(null)


const initialState = {
  role: null,
  produce: [],
  reservations: [],
  transactions: [],
  pickupPlans: [],
  isLoading: true,
  error: null,
}

function reducer(state, action) {
  switch (action.type) {

    case 'SET_INITIAL_DATA':
      return {
        ...state,
        produce: action.payload.produce || [],
        reservations: action.payload.reservations || [],
        transactions: action.payload.transactions || [],
        pickupPlans: action.payload.pickupPlans || [],
        isLoading: false,
      }
      
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false }

    case 'SET_ROLE':
      return { ...state, role: action.role }

    case 'ADD_PRODUCE': 

      return { ...state, produce: [action.payload, ...state.produce] }

    case 'RESERVE_PRODUCE': 

      const { updatedProduce, newReservation } = action.payload
      return {
        ...state,
        produce: state.produce.map(item => item.id === updatedProduce.id ? updatedProduce : item),
        reservations: [newReservation, ...state.reservations],
      }

     case 'CREATE_PICKUP_PLAN': 
      const { newPlan, updatedReservations } = action.payload
      return {
        ...state,
        pickupPlans: [newPlan, ...state.pickupPlans],
        reservations: state.reservations.map(r => 
          updatedReservations.find(ur => ur.id === r.id) || r
        ),
      }

    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] }

    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)


  useEffect(() => {
    async function loadDatabaseData() {
      try {

        const response = await fetch('http://localhost:5000/api/marketplace-data')
        const data = await response.json()
        
        dispatch({ type: 'SET_INITIAL_DATA', payload: data })
      } catch (error) {
        console.error("Failed to fetch database data:", error)
        dispatch({ type: 'SET_ERROR', payload: error.message })
      }
    }

    loadDatabaseData()
  }, [])

  const setRole = useCallback((role) => dispatch({ type: 'SET_ROLE', role }), [])

  // 4. Make actions async: Send to DB -> Wait for success -> Update UI
  const addProduce = useCallback(async (payload) => {
    try {
      const response = await fetch('/api/produce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          seller: CURRENT_SELLER, // You might eventually pull this from actual user auth
        }),
      })
      const savedListing = await response.json()
      
      // Update the UI only after the database saves it
      dispatch({ type: 'ADD_PRODUCE', payload: savedListing })
    } catch (error) {
      console.error("Failed to add produce:", error)
    }
  }, [])

  const reserveProduce = useCallback(async (produceId, quantity) => {
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produceId, quantity, buyer: CURRENT_BUYER }),
      })
      const data = await response.json()
      
      // Data should contain { updatedProduce, newReservation } from your backend
      dispatch({ type: 'RESERVE_PRODUCE', payload: data })
    } catch (error) {
      console.error("Failed to reserve produce:", error)
    }
  }, [])

  const createPickupPlan = useCallback(async (payload) => {
    try {
      const response = await fetch('/api/pickup-plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      
      dispatch({ type: 'CREATE_PICKUP_PLAN', payload: data })
    } catch (error) {
      console.error("Failed to create pickup plan:", error)
    }
  }, [])

  const logTransaction = useCallback(async (payload) => {
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const savedTransaction = await response.json()

      dispatch({ type: 'ADD_TRANSACTION', payload: savedTransaction })
    } catch (error) {
      console.error("Failed to log transaction:", error)
    }
  }, [])

  const value = useMemo(
    () => ({ ...state, setRole, addProduce, reserveProduce, createPickupPlan, logTransaction }),
    [state, setRole, addProduce, reserveProduce, createPickupPlan, logTransaction]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within an AppProvider')
  return ctx
}
