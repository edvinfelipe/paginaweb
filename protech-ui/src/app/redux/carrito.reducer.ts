import { Action } from "@ngrx/store";
import { INCREMENTAR, DECREMENTAR, INICIAR, RESET, actions } from "./carrito.actions";


export function carritoReducer(state: number, action:actions) {

  switch(action.type) {

    case INCREMENTAR:
      return state + 1;

    case DECREMENTAR:
      return state -1;

    case RESET:
      return state = 0;

    case INICIAR:
      return state = action.payload;

    default:
      return state;
  }
}
