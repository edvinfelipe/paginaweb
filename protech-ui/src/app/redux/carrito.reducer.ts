import { Action } from "@ngrx/store";

import { DECREMENTAR, INCREMENTAR, RESET, INICIAR, actions } from "./carrito.actions";

export function carritoReducer(state:number=0,action:actions) {

  switch(action.type) {

    case INCREMENTAR:
      return state + 1;

    case DECREMENTAR:
      return state - 1;

    case RESET:
      return state = 0;

    case INICIAR:
      return state = action.payload;

  }

}
