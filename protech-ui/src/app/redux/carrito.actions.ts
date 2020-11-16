import {Action} from '@ngrx/store';

export const INCREMENTAR = '[Contador] Incrementar';
export const DECREMENTAR = '[Contador] Decrementar';
export const INICIAR = '[Contador] Iniciar';
export const RESET = '[Contador] Reset';


export class IncrementarAction implements Action {
  readonly type = INCREMENTAR;
}

export class DecrementarAction implements Action {
  readonly type = DECREMENTAR;
}

export class IniciarAction implements Action {
  readonly type = INICIAR;

  constructor(public payload:number){}
}

export class ResetAction implements Action {
  readonly type = RESET;
}

export type actions  = IncrementarAction |
                        DecrementarAction |
                        IniciarAction  |
                        ResetAction;
