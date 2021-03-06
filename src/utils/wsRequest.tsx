import global from  '@/constants/config'
import wsSignature from './wsSignature';

const moment = require('moment');
const createRequest = (type: string) => {
  return {
    MsgType: type,
    CRID: wsSignature.getUniqueID(),
  };
};

const createSignedRequest = (type: string) => {
  let request:any = createRequest(type);
  const date = new Date();
  request.Date = moment(date).format('YYYYMMDD'); // 20160520
  request.Account = global.AccountID;
  return request;
};

const signedRequest = (request: any, fields: any) => {
  const headers = [request.MsgType, request.CRID, request.Date, request.Account];
  let concatArray = [];
  if (fields) {
    concatArray = headers.concat(fields);
  }else {
    concatArray = headers;
  };
  const joinStr = concatArray.join('');
  request.SIG = wsSignature.getSignature(joinStr);
  return request;
};

const createGetTradesRequest = (symbol: string, count: string) => {
  let request:any = createRequest('GetTradesRequest');
  request.Count = count;
  request.Symbol = symbol;
  return JSON.stringify(request);
};

const createQuoteRequest = (symbol: string, type: string) => {
  let request:any = createRequest('QuoteRequest');
  request.Symbol = symbol;
  request.QuoteType = type;
  return JSON.stringify(request);
};

const createGetOrdersRequest = (symbol: string, begin: string, end: string, status: string) => {
  let request:any = createSignedRequest('GetOrdersRequest');
  request.Symbol = symbol;
  request.Status = status;
  request.Begin = begin;
  request.End = end;
  signedRequest(request, [symbol, begin, end, status]);
  return JSON.stringify(request);
};

const createLoginRequest = () => {
  let request:any = createSignedRequest('LoginRequest');
  signedRequest(request, []);
  return JSON.stringify(request);
};

const createLogoutRequest = () => {
  let request:any = createSignedRequest('LogoutRequest');
  signedRequest(request, []);
  return JSON.stringify(request);
};

const createGetAccountInfoRequest = () => {
  let request:any = createSignedRequest('GetAccountInfoRequest');
  signedRequest(request, []);
  return JSON.stringify(request);
};

const createSubscribeRequest = () => {
  let request:any = createSignedRequest('SubscribeRequest');
  signedRequest(request, []);
  return JSON.stringify(request);
};

const createUnsubscribeRequest = () => {
  let request:any = createSignedRequest('UnsubscribeRequest');
  signedRequest(request, []);
  return JSON.stringify(request);
};

const createPlaceOrderRequest = (symbol: string, side: string, orderType: string, quantity: string, price: string, stopPrice: string) => {
  let request:any = createSignedRequest('PlaceOrderRequest');
  request.Symbol = symbol;
  request.Side = side;
  request.OrderType = orderType;
  request.Quantity = quantity;
  request.Price = price;
  request.StopPrice = stopPrice;
  signedRequest(request, [symbol, side, orderType, quantity, price, stopPrice]);
  return JSON.stringify(request);
};

const createCancelOrderRequest = (symbol: string, OID: string) => {
  let request:any = createSignedRequest('CancelOrderRequest');
  request.Symbol = symbol;
  request.OID = OID;
  signedRequest(request, [symbol, OID]);
  return JSON.stringify(request);
};

const createCancelReplaceOrderRequest = (symbol: string, OID: string, quantity: string, price: string, stopPrice: string, oldQuantity: string) => {
  let request:any = createSignedRequest('CancelReplaceOrderRequest');
  request.Symbol = symbol;
  request.OID = OID;
  request.Quantity = quantity;
  request.OldQuantity = oldQuantity;
  request.Price = price;
  request.StopPrice = stopPrice;
  signedRequest(request, [symbol, OID, quantity, price, stopPrice, oldQuantity]);
  return JSON.stringify(request);
};

const createRetrieveTransactionsRequest = (symbol: string, Start: string, End: string, Filter: string, PageIndex: string, RecCountsPerPage: string) => {
  let request:any = createSignedRequest('RetrieveTransactionsRequest');
  request.Symbol = symbol;
  request.Start = Start;
  request.End = End;
  request.Filter = Filter;
  request.PageIndex = PageIndex;
  request.RecCountsPerPage = RecCountsPerPage;
  signedRequest(request, [symbol, Start, End, Filter, PageIndex, RecCountsPerPage]);
  return JSON.stringify(request);
};

const createAllOrdersRequest = (Symbol: string, Side: string, HighPrice: string, LowPrice: string) => {
  let request:any = createSignedRequest('CancelAllOrdersRequest');
  request.Symbol = Symbol;
  request.Side = Side;
  request.HighPrice = HighPrice;
  request.LowPrice = LowPrice;
  signedRequest(request, [Symbol, Side, HighPrice, LowPrice]);
  return JSON.stringify(request);
};

const createGetActiveContractsRequest = () => {
  let request:any = createRequest('GetActiveContractsRequest');
  return JSON.stringify(request);
};

const createQueryDealQuoteRequest = (Symbol: string, Side: string) => {
  let request:any = createSignedRequest('QueryDealQuoteRequest');
  request.Symbol = Symbol;
  request.Side = Side;
  signedRequest(request, [Symbol, Side]);
  return JSON.stringify(request);
};

const createExecuteDealQuoteRequest = (Symbol: string, Quantity: string) => {
  let request:any = createSignedRequest('ExecuteDealQuoteRequest');
  request.Symbol = Symbol;
  request.Quantity = Quantity;
  signedRequest(request, [Symbol, Quantity]);
  return JSON.stringify(request);
};

export default {
  createGetTradesRequest,
  createQuoteRequest,
  createGetOrdersRequest,
  createLoginRequest,
  createLogoutRequest,
  createGetAccountInfoRequest,
  createSubscribeRequest,
  createUnsubscribeRequest,
  createPlaceOrderRequest,
  createCancelOrderRequest,
  createCancelReplaceOrderRequest,
  createRetrieveTransactionsRequest,
  createAllOrdersRequest,
  createGetActiveContractsRequest,
  createQueryDealQuoteRequest,
  createExecuteDealQuoteRequest,
};
