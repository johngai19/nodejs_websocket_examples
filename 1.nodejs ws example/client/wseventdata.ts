export default interface IWsevent {
  event: string;
  data:string;
}

export const helloWs:IWsevent={ 'event': 'hello', 'data': 'hello client' };