import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PERIOD } from './types';

interface InvestmentReturnResponse {
  investido: number;
  juros: number;
  valorTotal: number;
  taxaAplicada: number;
}

interface InvestmentReturnArgs {
  value: number;
  period: PERIOD;
  periodAmount: number;
}

export const investimentoApi = createApi({
  reducerPath: 'investimentoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7021/api/investimento',
  }),
  endpoints: (builder) => ({
    getInvestmentReturn: builder.mutation<
      InvestmentReturnResponse,
      InvestmentReturnArgs
    >({
      query: ({ period, periodAmount, value }) =>
        `/?period=${period}&valorInvestido=${value}&periodAmount=${periodAmount}`,
    }),
  }),
});

export const { useGetInvestmentReturnMutation } = investimentoApi;
