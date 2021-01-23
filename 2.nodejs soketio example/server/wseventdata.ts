export default interface IWsevent {
  event: string;
  data:string;
}

export const helloWs:IWsevent={ 'event': 'hello', 'data': 'hello client' };
export const resWs:IWsevent={ 'event': 'response', 'data': 'response:' };
export const endWs:IWsevent={'event':'end','data':''};