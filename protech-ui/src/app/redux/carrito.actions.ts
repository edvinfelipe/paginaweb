import {Action} from "@ngrx/store"


export const INCREMENTAR = '[Contador] Incrementar';
export const DECREMENTAR = '[Contador] Decrementar';
export const RESET = '[Contador] Reset';
export const INICIAR = '[Contador] Iniciar';

export class IncrementarAction implements Action {
  readonly type = INCREMENTAR;
}

export class DecrementarAction implements Action {
  readonly type = DECREMENTAR;
}

export class ResetAction implements Action {
  readonly type = RESET;
}

export class IniciarAction implements Action {
  readonly type = INICIAR;

  constructor(public payload:number){}
}


export type actions = IncrementarAction  |
                      DecrementarAction  |
                      ResetAction        |
                      IniciarAction;



