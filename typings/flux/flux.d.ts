/**
 * Created by bparadie on 2/27/15.
 */

declare module Flux {

  type DispatcherID = string;

  class Dispatcher
  {
      register<T>(callback: (action:T) => void): DispatcherID;
      unregister(id:DispatcherID): void;
      waitFor(ids: DispatcherID[]): void;
      dispatch<T>(action:T): void;
  }
}



declare module "flux" {
  export = Flux;
}

